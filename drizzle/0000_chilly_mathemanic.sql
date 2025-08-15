CREATE TABLE `bundled_offering` (
	`parent_offering_id` text,
	`child_offering_id` text,
	PRIMARY KEY(`parent_offering_id`, `child_offering_id`),
	FOREIGN KEY (`parent_offering_id`) REFERENCES `product_offering`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`child_offering_id`) REFERENCES `product_offering`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `category` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text,
	`name` text NOT NULL,
	`description` text,
	`is_root` integer DEFAULT false,
	`parent_id` text,
	`lifecycle_status` text,
	`version` text,
	`last_update` integer,
	`valid_for_start` integer,
	`valid_for_end` integer,
	FOREIGN KEY (`parent_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `char_value_spec` (
	`id` text PRIMARY KEY NOT NULL,
	`char_id` text NOT NULL,
	`is_default` integer DEFAULT false,
	`uom` text,
	`value_string` text,
	`value_number` real,
	`value_boolean` integer,
	`value_from` real,
	`value_to` real,
	FOREIGN KEY (`char_id`) REFERENCES `spec_characteristic`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `offering_category` (
	`offering_id` text,
	`category_id` text,
	PRIMARY KEY(`offering_id`, `category_id`),
	FOREIGN KEY (`offering_id`) REFERENCES `product_offering`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`category_id`) REFERENCES `category`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `policy_attachment` (
	`entity_type` text NOT NULL,
	`entity_id` text NOT NULL,
	`policy_ref_id` text,
	PRIMARY KEY(`entity_type`, `entity_id`, `policy_ref_id`),
	FOREIGN KEY (`policy_ref_id`) REFERENCES `policy_ref`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `policy_ref` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`href` text,
	`version` text
);
--> statement-breakpoint
CREATE TABLE `price_to_char_value` (
	`price_id` text,
	`value_id` text,
	PRIMARY KEY(`price_id`, `value_id`),
	FOREIGN KEY (`price_id`) REFERENCES `product_offering_price`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`value_id`) REFERENCES `char_value_spec`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `price_to_offering` (
	`price_id` text,
	`offering_id` text,
	PRIMARY KEY(`price_id`, `offering_id`),
	FOREIGN KEY (`price_id`) REFERENCES `product_offering_price`(`id`) ON UPDATE no action ON DELETE cascade,
	FOREIGN KEY (`offering_id`) REFERENCES `product_offering`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `product_offering` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text,
	`name` text NOT NULL,
	`description` text,
	`is_bundle` integer DEFAULT false NOT NULL,
	`is_sellable` integer DEFAULT true NOT NULL,
	`lifecycle_status` text,
	`last_update` integer,
	`product_specification_id` text,
	`valid_for_start` integer,
	`valid_for_end` integer,
	FOREIGN KEY (`product_specification_id`) REFERENCES `product_specification`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `product_offering_price` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text,
	`name` text NOT NULL,
	`description` text,
	`price_type` text NOT NULL,
	`recurring_charge_period_type` text,
	`recurring_charge_period_length` integer,
	`uom` text,
	`lifecycle_status` text,
	`last_update` integer,
	`currency` text,
	`duty_free_amount` real,
	`tax_included_amount` real,
	`percentage` real,
	`tax_rate` real,
	`valid_for_start` integer,
	`valid_for_end` integer
);
--> statement-breakpoint
CREATE TABLE `product_specification` (
	`id` text PRIMARY KEY NOT NULL,
	`href` text,
	`name` text NOT NULL,
	`description` text,
	`brand` text,
	`version` text,
	`lifecycle_status` text,
	`last_update` integer,
	`valid_for_start` integer,
	`valid_for_end` integer
);
--> statement-breakpoint
CREATE TABLE `spec_characteristic` (
	`id` text PRIMARY KEY NOT NULL,
	`spec_id` text NOT NULL,
	`name` text NOT NULL,
	`value_type` text NOT NULL,
	`configurable` integer DEFAULT true NOT NULL,
	`description` text,
	FOREIGN KEY (`spec_id`) REFERENCES `product_specification`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `user` (
	`id` text PRIMARY KEY NOT NULL,
	`username` text NOT NULL,
	`password_hash` text NOT NULL,
	`role` text DEFAULT 'user' NOT NULL,
	`created_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `user_username_unique` ON `user` (`username`);