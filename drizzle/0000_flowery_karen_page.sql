CREATE TABLE `proposal_comments` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`proposal_number` integer NOT NULL,
	`name` text NOT NULL,
	`email` text DEFAULT '' NOT NULL,
	`comment` text NOT NULL,
	`accepted_terms` integer NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	`created_at` text DEFAULT CURRENT_TIMESTAMP NOT NULL
);
--> statement-breakpoint
CREATE INDEX `proposal_comments_proposal_idx` ON `proposal_comments` (`proposal_number`);--> statement-breakpoint
CREATE INDEX `proposal_comments_status_idx` ON `proposal_comments` (`status`);