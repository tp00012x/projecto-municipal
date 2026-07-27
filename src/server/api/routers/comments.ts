import { TRPCError } from "@trpc/server";
import { and, count, eq, ne } from "drizzle-orm";
import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { comments } from "~/server/db/schema";

const blockedTerms = [
  "idiota",
  "imbécil",
  "estúpido",
  "terrorista",
  "racista",
  "nazi",
];

function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

export const commentsRouter = createTRPCRouter({
  getCounts: publicProcedure.query(async ({ ctx }) => {
    if (!ctx.db) {
      return {};
    }

    try {
      const rows = await ctx.db
        .select({
          proposalNumber: comments.proposalNumber,
          total: count(comments.id),
        })
        .from(comments)
        .where(ne(comments.status, "rejected"))
        .groupBy(comments.proposalNumber);

      const counts: Record<string, number> = {};
      rows.forEach((row) => {
        counts[String(row.proposalNumber)] = row.total;
      });
      return counts;
    } catch {
      return {};
    }
  }),

  create: publicProcedure
    .input(
      z.object({
        proposalNumber: z.number().int().min(1).max(23),
        name: z.string().trim().min(2).max(50),
        email: z.string().trim().optional().default(""),
        comment: z.string().trim().min(20).max(800),
        acceptedTerms: z.boolean().refine((value) => value, {
          message: "Debes aceptar el aviso de participación y privacidad.",
        }),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const name = normalize(input.name);
      const email = normalize(input.email ?? "").toLowerCase();
      const comment = normalize(input.comment);

      if (name.length < 2 || name.length > 50) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El nombre o alias debe tener entre 2 y 50 caracteres.",
        });
      }
      if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Ingresa un correo válido o deja el campo vacío.",
        });
      }
      if (comment.length < 20 || comment.length > 800) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "El comentario debe tener entre 20 y 800 caracteres.",
        });
      }

      const lowered = `${name} ${comment}`.toLocaleLowerCase("es");
      const urlCount = (comment.match(/https?:\/\/|www\./gi) ?? []).length;
      const repeatedCharacters = /(.)\1{8,}/.test(comment);
      if (
        blockedTerms.some((term) => lowered.includes(term)) ||
        urlCount > 1 ||
        repeatedCharacters
      ) {
        throw new TRPCError({
          code: "UNPROCESSABLE_CONTENT",
          message:
            "Revisa tu mensaje: no aceptamos insultos, contenido discriminatorio ni publicidad.",
        });
      }

      if (!ctx.db) {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message:
            "El módulo de participación aún no está disponible. Vuelve a intentarlo pronto.",
        });
      }

      try {
        await ctx.db.insert(comments).values({
          proposalNumber: input.proposalNumber,
          name,
          email,
          comment,
          acceptedTerms: true,
          status: "pending",
        });

        const [result] = await ctx.db
          .select({ total: count(comments.id) })
          .from(comments)
          .where(
            and(
              eq(comments.proposalNumber, input.proposalNumber),
              ne(comments.status, "rejected"),
            ),
          );

        return {
          count: result?.total ?? 1,
          message:
            "¡Gracias! Tu sugerencia fue recibida y pasará por moderación.",
        };
      } catch {
        throw new TRPCError({
          code: "SERVICE_UNAVAILABLE",
          message:
            "El módulo de participación está iniciándose. Inténtalo nuevamente en unos instantes.",
        });
      }
    }),
});

