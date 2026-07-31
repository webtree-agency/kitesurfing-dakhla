import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('admin', 'editor');
  CREATE TABLE "testimonials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"text" varchar NOT NULL,
  	"rating" numeric DEFAULT 5,
  	"sort" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "faqs_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"sort" numeric DEFAULT 0,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"caption" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_thumbnail_url" varchar,
  	"sizes_thumbnail_width" numeric,
  	"sizes_thumbnail_height" numeric,
  	"sizes_thumbnail_mime_type" varchar,
  	"sizes_thumbnail_filesize" numeric,
  	"sizes_thumbnail_filename" varchar,
  	"sizes_card_url" varchar,
  	"sizes_card_width" numeric,
  	"sizes_card_height" numeric,
  	"sizes_card_mime_type" varchar,
  	"sizes_card_filesize" numeric,
  	"sizes_card_filename" varchar,
  	"sizes_hero_url" varchar,
  	"sizes_hero_width" numeric,
  	"sizes_hero_height" numeric,
  	"sizes_hero_mime_type" varchar,
  	"sizes_hero_filesize" numeric,
  	"sizes_hero_filename" varchar,
  	"sizes_og_url" varchar,
  	"sizes_og_width" numeric,
  	"sizes_og_height" numeric,
  	"sizes_og_mime_type" varchar,
  	"sizes_og_filesize" numeric,
  	"sizes_og_filename" varchar
  );
  
  CREATE TABLE "users_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"role" "enum_users_role" DEFAULT 'editor' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"testimonials_id" integer,
  	"faqs_id" integer,
  	"media_id" integer,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "settings" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"phone_display" varchar DEFAULT '+212 628‑283870',
  	"tel_href" varchar DEFAULT 'tel:+212 628‑283870',
  	"whatsapp_url" varchar DEFAULT 'https://wa.me/212628283870',
  	"email" varchar DEFAULT 'kitesurfingdakhla@gmail.com',
  	"address" varchar DEFAULT 'Dakhla, Morocco',
  	"instagram_url" varchar DEFAULT 'https://www.instagram.com/kitesurfing_dakhla?igsh=djJvMThvZTlpczZ1&utm_source=qr',
  	"facebook_url" varchar DEFAULT 'https://www.facebook.com/kitesurfingdakhla',
  	"maps_embed_src" varchar DEFAULT 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d58450.77778633404!2d-15.98677539801059!3d23.705493487153525!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xc2248393aa06243%3A0x2572dbf2ee5f0172!2sAd-Dakhla%2073000!5e0!3m2!1sde!2sch!4v1726513776347!5m2!1sde!2sch',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "startseite_services_icon_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "startseite_services_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"image_id" integer,
  	"image_alt" varchar,
  	"link_href" varchar,
  	"button_label" varchar
  );
  
  CREATE TABLE "startseite_about_us_bullets" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "startseite_gallery_desktop_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "startseite_gallery_mobile_carousel_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "startseite_contact_info_text_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "startseite" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_title" varchar DEFAULT 'Kitesurfing Dakhla',
  	"hero_subtitle" varchar DEFAULT 'ENJOY WHAT YOU LOVE AND WE TAKE CARE OF THE REST',
  	"hero_button_label" varchar DEFAULT 'Services',
  	"hero_button_href" varchar DEFAULT '#services',
  	"services_eyebrow" varchar DEFAULT 'Kitesurfing Dakhla Services',
  	"services_heading" varchar DEFAULT 'Explore Our Kitesurfing <span class="orange-dot">Packages</span>',
  	"services_intro" varchar DEFAULT 'Experience the thrill of kitesurfing in Dakhla. Whether you''re a beginner or experienced rider, our expert instructors ensure fast progression in ideal conditions.',
  	"services_cards_heading" varchar DEFAULT 'Choose Your Kitesurfing Package<span class="text-orange">:</span>',
  	"about_us_eyebrow" varchar DEFAULT 'About Us',
  	"about_us_heading" varchar DEFAULT 'Meet <span class="orange-dot">Kitesurfing Dakhla</span>',
  	"about_us_intro" varchar DEFAULT 'At Kitesurfing Dakhla, we’re a family of water sports enthusiasts, dedicated to sharing the excitement of kitesurfing in Dakhla''s perfect conditions.',
  	"about_us_image_id" integer,
  	"about_us_image_alt" varchar DEFAULT 'Kitesurfing Dakhla team in Morocco',
  	"about_us_why_choose_heading" varchar DEFAULT 'Why Choose Us?',
  	"about_us_why_choose_text" varchar DEFAULT 'Join us for the ultimate kitesurfing experience in Dakhla. We offer top-notch lessons, a safe environment, and fun for all skill levels.',
  	"about_us_button_label" varchar DEFAULT 'Learn More',
  	"about_us_button_href" varchar DEFAULT '#about-us',
  	"parallax_heading" varchar DEFAULT 'We Teach With Passion<span class="text-orange">.</span>',
  	"contact_info_heading" varchar DEFAULT 'Ready for the adventure?',
  	"contact_info_button_label" varchar DEFAULT 'Book now',
  	"contact_info_button_href" varchar DEFAULT './book',
  	"testimonial_section_eyebrow" varchar DEFAULT 'Testimonials',
  	"testimonial_section_heading" varchar DEFAULT 'What our customers <span class="orange-dot">say</span>',
  	"faq_section_eyebrow" varchar DEFAULT 'FAQs',
  	"faq_section_heading" varchar DEFAULT 'Frequently Asked <span class="orange-dot">Questions</span>',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "all_inclusive_icon_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "all_inclusive_carousel_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"alt" varchar
  );
  
  CREATE TABLE "all_inclusive_included_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "all_inclusive_not_included_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "all_inclusive_price_table_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"room_type" varchar NOT NULL,
  	"people" varchar,
  	"price" varchar NOT NULL
  );
  
  CREATE TABLE "all_inclusive_contact_info_text_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "all_inclusive" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Services',
  	"hero_heading" varchar DEFAULT '7 Day All-inclusive Kitesurf <span class="orange-dot">Adventure</span>',
  	"lead" varchar DEFAULT 'Join us for an unforgettable 7-day kitesurfing adventure in Dakhla, a world-renowned paradise. Whether you''re a beginner or experienced, this all-inclusive camp offers perfect conditions. Our IKO-certified, multilingual instructors focus on safety and effective teaching to help you become an independent kitesurfer fast.',
  	"included_heading" varchar DEFAULT 'What''s included',
  	"not_included_heading" varchar DEFAULT 'What''s not included',
  	"price_table_column_labels_room_type" varchar DEFAULT 'Room Type',
  	"price_table_column_labels_people" varchar DEFAULT 'People in Package',
  	"price_table_column_labels_price" varchar DEFAULT 'Price',
  	"alert_text" varchar DEFAULT '<strong>Spots are limited </strong>book now and let the <strong>adventure</strong> begin!',
  	"cta_button_label" varchar DEFAULT 'Book now',
  	"cta_button_href" varchar DEFAULT './book',
  	"contact_info_heading" varchar DEFAULT 'Your are in good hands!',
  	"contact_info_button_label" varchar DEFAULT 'Book now',
  	"contact_info_button_href" varchar DEFAULT './book',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kitesurf_lessons_semi_private_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_lessons_semi_private_icon_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_lessons_semi_private_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"note" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_lessons_private_description" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_lessons_private_icon_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_lessons_private_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"note" varchar,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_lessons_contact_info_text_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_lessons" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Services',
  	"hero_heading" varchar DEFAULT 'Kitesurf <span class="orange-dot">Lessons</span>',
  	"semi_private_tab_label" varchar DEFAULT 'Semi Private Lessons',
  	"semi_private_title" varchar DEFAULT 'Semi-Private Kitesurfing Lessons',
  	"semi_private_alert_text" varchar DEFAULT '<strong>Beginner? </strong>We recommend the <b>12-hour package</b> for a comprehensive 3-day learning experience (weather permitting).',
  	"semi_private_cta_button_label" varchar DEFAULT 'Book now',
  	"semi_private_cta_button_href" varchar DEFAULT './book',
  	"private_tab_label" varchar DEFAULT 'Private Lessons',
  	"private_title" varchar DEFAULT 'Private Kitesurfing Lessons',
  	"private_alert_text" varchar DEFAULT '<strong>Beginner? </strong>We recommend the <b>12-hour package</b> for a comprehensive 3-day learning experience (weather permitting).',
  	"private_cta_button_label" varchar DEFAULT 'Book now',
  	"private_cta_button_href" varchar DEFAULT './book',
  	"contact_info_heading" varchar DEFAULT 'Your are in good hands!',
  	"contact_info_button_label" varchar DEFAULT 'Book now',
  	"contact_info_button_href" varchar DEFAULT './book',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kitesurf_rental_how_it_works_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_rental_icon_features" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"icon_class" varchar,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_rental_full_gear_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_rental_kite_only_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_rental_board_only_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_rental_insurance_price_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"label" varchar NOT NULL,
  	"price" varchar NOT NULL,
  	"highlighted" boolean DEFAULT false
  );
  
  CREATE TABLE "kitesurf_rental_contact_info_text_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_rental" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Services',
  	"hero_heading" varchar DEFAULT 'Kitesurf <span class="orange-dot">Rental</span>',
  	"how_it_works_heading" varchar DEFAULT 'How it works',
  	"cta_button_label" varchar DEFAULT 'Book now',
  	"cta_button_href" varchar DEFAULT './book',
  	"full_gear_tab_label" varchar DEFAULT 'Full Gear',
  	"full_gear_title" varchar DEFAULT 'Full Gear',
  	"kite_only_tab_label" varchar DEFAULT 'Kite Only',
  	"kite_only_title" varchar DEFAULT 'Kite Only',
  	"board_only_tab_label" varchar DEFAULT 'Board Only',
  	"board_only_title" varchar DEFAULT 'Board Only',
  	"insurance_tab_label" varchar DEFAULT 'Insurance',
  	"insurance_title" varchar DEFAULT 'Insurance',
  	"contact_info_heading" varchar DEFAULT 'Your are in good hands!',
  	"contact_info_button_label" varchar DEFAULT 'Book now',
  	"contact_info_button_href" varchar DEFAULT './book',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "kitesurf_trips_white_dune_what_to_expect_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_white_dune_how_it_works_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_secret_spot_what_to_expect_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_secret_spot_how_it_works_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_oyster_farm_what_to_expect_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_oyster_farm_how_it_works_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips_contact_info_text_lines" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "kitesurf_trips" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'Services',
  	"hero_heading" varchar DEFAULT 'Kitesurf <span class="orange-dot">Trips</span>',
  	"white_dune_tab_label" varchar DEFAULT 'White Dune',
  	"white_dune_title" varchar DEFAULT 'Trip to the White Dune',
  	"white_dune_intro" varchar DEFAULT 'Experience a thrilling, exclusive journey to the White Dune, with stunning landscapes and hidden kite spots in Dakhla.',
  	"white_dune_image_id" integer,
  	"white_dune_image_alt" varchar DEFAULT 'White Dune',
  	"white_dune_what_to_expect_heading" varchar DEFAULT 'What to Expect',
  	"white_dune_how_it_works_heading" varchar DEFAULT 'How It Works',
  	"white_dune_price_info_column_labels_price" varchar DEFAULT 'Price',
  	"white_dune_price_info_column_labels_group_size" varchar DEFAULT 'Group Size',
  	"white_dune_price_info_column_labels_skill_requirement" varchar DEFAULT 'Skill Requirement',
  	"white_dune_price_info_price" varchar DEFAULT '25€ per person',
  	"white_dune_price_info_group_size" varchar DEFAULT '4-6 people',
  	"white_dune_price_info_skill_requirement" varchar DEFAULT 'Independent kiter',
  	"white_dune_alert_text" varchar DEFAULT '<strong>This is more than a vacation—</strong>it’s your ticket to an unforgettable escape into Dakhla’s untouched beauty.',
  	"white_dune_cta_button_label" varchar DEFAULT 'Book now',
  	"white_dune_cta_button_href" varchar DEFAULT './book',
  	"secret_spot_tab_label" varchar DEFAULT 'Secret Spot',
  	"secret_spot_title" varchar DEFAULT 'Trip to the Secret Spot',
  	"secret_spot_intro" varchar DEFAULT 'Discover the secluded beauty of the Secret Spot, with breathtaking views and hidden kite locations in Dakhla.',
  	"secret_spot_image_id" integer,
  	"secret_spot_image_alt" varchar DEFAULT 'Secret Spot',
  	"secret_spot_what_to_expect_heading" varchar DEFAULT 'What to Expect',
  	"secret_spot_how_it_works_heading" varchar DEFAULT 'How It Works',
  	"secret_spot_price_info_column_labels_price" varchar DEFAULT 'Price',
  	"secret_spot_price_info_column_labels_group_size" varchar DEFAULT 'Group Size',
  	"secret_spot_price_info_column_labels_skill_requirement" varchar DEFAULT 'Skill Requirement',
  	"secret_spot_price_info_price" varchar DEFAULT '25€ per person',
  	"secret_spot_price_info_group_size" varchar DEFAULT '4-6 people',
  	"secret_spot_price_info_skill_requirement" varchar DEFAULT 'Independent kiter',
  	"secret_spot_alert_text" varchar DEFAULT '<strong>This is more than a vacation—</strong>it’s your chance to explore Dakhla’s hidden wonders.',
  	"secret_spot_cta_button_label" varchar DEFAULT 'Book now',
  	"secret_spot_cta_button_href" varchar DEFAULT './book',
  	"oyster_farm_tab_label" varchar DEFAULT 'Oyster Farm',
  	"oyster_farm_title" varchar DEFAULT 'Trip to the Oyster Farm',
  	"oyster_farm_intro" varchar DEFAULT 'Discover the Oyster Farm, where nature and local tradition come together in Dakhla.',
  	"oyster_farm_image_id" integer,
  	"oyster_farm_image_alt" varchar DEFAULT 'Oyster Farm',
  	"oyster_farm_what_to_expect_heading" varchar DEFAULT 'What to Expect',
  	"oyster_farm_how_it_works_heading" varchar DEFAULT 'How It Works',
  	"oyster_farm_price_info_column_labels_price" varchar DEFAULT 'Price',
  	"oyster_farm_price_info_column_labels_group_size" varchar DEFAULT 'Group Size',
  	"oyster_farm_price_info_column_labels_skill_requirement" varchar DEFAULT 'Skill Requirement',
  	"oyster_farm_price_info_price" varchar DEFAULT '25€ per person',
  	"oyster_farm_price_info_group_size" varchar DEFAULT '4-6 people',
  	"oyster_farm_price_info_skill_requirement" varchar DEFAULT 'Independent kiter',
  	"oyster_farm_alert_text" varchar DEFAULT '<strong>This is more than a vacation—</strong>it’s your gateway to Dakhla’s hidden treasures.',
  	"oyster_farm_cta_button_label" varchar DEFAULT 'Book now',
  	"oyster_farm_cta_button_href" varchar DEFAULT './book',
  	"contact_info_heading" varchar DEFAULT 'Your are in good hands!',
  	"contact_info_button_label" varchar DEFAULT 'Book now',
  	"contact_info_button_href" varchar DEFAULT './book',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "buchung_form_service_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" varchar NOT NULL,
  	"label" varchar NOT NULL
  );
  
  CREATE TABLE "buchung" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"hero_eyebrow" varchar DEFAULT 'BOOK',
  	"hero_heading" varchar DEFAULT 'We are happy to see you <span class="orange-dot">soon!</span>',
  	"form_action" varchar DEFAULT 'https://usebasin.com/f/f80dc0ab53ae',
  	"form_name_placeholder" varchar DEFAULT 'My name is',
  	"form_email_placeholder" varchar DEFAULT 'My e-mail is',
  	"form_telephone_placeholder" varchar DEFAULT 'My number is',
  	"form_service_placeholder" varchar DEFAULT 'Choose a service:',
  	"form_message_placeholder" varchar DEFAULT 'I''d like to chat about',
  	"form_submit_label" varchar DEFAULT 'Send Message',
  	"contact_via_text" varchar DEFAULT 'OR CONTACT US VIA',
  	"whatsapp_url" varchar DEFAULT 'https://wa.me/212628283870',
  	"success_eyebrow" varchar DEFAULT 'Thank you!',
  	"success_heading" varchar DEFAULT 'We''ll get back to you <span class="orange-dot">soon!</span>',
  	"success_button_label" varchar DEFAULT 'Back to Home',
  	"success_button_href" varchar DEFAULT './index.html',
  	"meta_title" varchar,
  	"meta_description" varchar,
  	"meta_image_id" integer,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "imprint_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Legal',
  	"heading" varchar DEFAULT '<span class="orange-dot">Imprint</span>',
  	"intro" varchar DEFAULT 'This website is operated by:',
  	"company_label" varchar DEFAULT 'Company Name:',
  	"company_name" varchar DEFAULT 'Kitesurfing Dakhla',
  	"address_label" varchar DEFAULT 'Address:',
  	"address" varchar DEFAULT 'Dakhla, Morocco',
  	"phone_label" varchar DEFAULT 'Phone:',
  	"phone_display" varchar DEFAULT '+212 628‑283870',
  	"tel_href" varchar DEFAULT 'tel:+212628283870',
  	"email_label" varchar DEFAULT 'Email:',
  	"email" varchar DEFAULT 'kitesurfingdakhla@gmail.com',
  	"legal_reference" varchar DEFAULT 'Responsible for content according to § 55 Abs. 2 RStV:',
  	"responsible_name_label" varchar DEFAULT 'Name:',
  	"responsible_name" varchar DEFAULT 'Lahcen Ouazzan',
  	"responsible_address_label" varchar DEFAULT 'Address:',
  	"responsible_address" varchar DEFAULT 'Dakhla, Morocco',
  	"follow_us_heading" varchar DEFAULT 'Follow Us',
  	"instagram_url" varchar DEFAULT 'https://www.instagram.com/kitesurfing_dakhla?igsh=djJvMThvZTlpczZ1&utm_source=qr',
  	"facebook_url" varchar DEFAULT 'https://www.facebook.com/kitesurfingdakhla',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "privacy_policy_page_sections_paragraphs" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"text" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_policy_page_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"heading" varchar NOT NULL
  );
  
  CREATE TABLE "privacy_policy_page" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"eyebrow" varchar DEFAULT 'Privacy',
  	"heading" varchar DEFAULT 'Privacy <span class="orange-dot">Policy </span>',
  	"intro" varchar DEFAULT 'This Privacy Policy explains how we collect, use, and protect your personal information.',
  	"contact_company_label" varchar DEFAULT 'Company Name:',
  	"contact_company_name" varchar DEFAULT 'Kitesurfing Dakhla',
  	"contact_address_label" varchar DEFAULT 'Address:',
  	"contact_address" varchar DEFAULT 'Dakhla, Morocco',
  	"contact_phone_label" varchar DEFAULT 'Phone:',
  	"contact_phone_display" varchar DEFAULT '+212 628‑283870',
  	"contact_tel_href" varchar DEFAULT 'tel:+212628283870',
  	"contact_email_label" varchar DEFAULT 'Email:',
  	"contact_email" varchar DEFAULT 'kitesurfingdakhla@gmail.com',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "faqs_paragraphs" ADD CONSTRAINT "faqs_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_testimonials_fk" FOREIGN KEY ("testimonials_id") REFERENCES "public"."testimonials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_services_icon_features" ADD CONSTRAINT "startseite_services_icon_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_services_cards" ADD CONSTRAINT "startseite_services_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite_services_cards" ADD CONSTRAINT "startseite_services_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_about_us_bullets" ADD CONSTRAINT "startseite_about_us_bullets_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_gallery_desktop_images" ADD CONSTRAINT "startseite_gallery_desktop_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite_gallery_desktop_images" ADD CONSTRAINT "startseite_gallery_desktop_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_gallery_mobile_carousel_images" ADD CONSTRAINT "startseite_gallery_mobile_carousel_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite_gallery_mobile_carousel_images" ADD CONSTRAINT "startseite_gallery_mobile_carousel_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite_contact_info_text_lines" ADD CONSTRAINT "startseite_contact_info_text_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."startseite"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_about_us_image_id_media_id_fk" FOREIGN KEY ("about_us_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "startseite" ADD CONSTRAINT "startseite_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "all_inclusive_icon_features" ADD CONSTRAINT "all_inclusive_icon_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive_carousel_images" ADD CONSTRAINT "all_inclusive_carousel_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "all_inclusive_carousel_images" ADD CONSTRAINT "all_inclusive_carousel_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive_included_items" ADD CONSTRAINT "all_inclusive_included_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive_not_included_items" ADD CONSTRAINT "all_inclusive_not_included_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive_price_table_rows" ADD CONSTRAINT "all_inclusive_price_table_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive_contact_info_text_lines" ADD CONSTRAINT "all_inclusive_contact_info_text_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."all_inclusive"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "all_inclusive" ADD CONSTRAINT "all_inclusive_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_semi_private_description" ADD CONSTRAINT "kitesurf_lessons_semi_private_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_semi_private_icon_features" ADD CONSTRAINT "kitesurf_lessons_semi_private_icon_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_semi_private_price_rows" ADD CONSTRAINT "kitesurf_lessons_semi_private_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_private_description" ADD CONSTRAINT "kitesurf_lessons_private_description_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_private_icon_features" ADD CONSTRAINT "kitesurf_lessons_private_icon_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_private_price_rows" ADD CONSTRAINT "kitesurf_lessons_private_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons_contact_info_text_lines" ADD CONSTRAINT "kitesurf_lessons_contact_info_text_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_lessons"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_lessons" ADD CONSTRAINT "kitesurf_lessons_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_how_it_works_paragraphs" ADD CONSTRAINT "kitesurf_rental_how_it_works_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_icon_features" ADD CONSTRAINT "kitesurf_rental_icon_features_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_full_gear_price_rows" ADD CONSTRAINT "kitesurf_rental_full_gear_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_kite_only_price_rows" ADD CONSTRAINT "kitesurf_rental_kite_only_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_board_only_price_rows" ADD CONSTRAINT "kitesurf_rental_board_only_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_insurance_price_rows" ADD CONSTRAINT "kitesurf_rental_insurance_price_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental_contact_info_text_lines" ADD CONSTRAINT "kitesurf_rental_contact_info_text_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_rental"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_rental" ADD CONSTRAINT "kitesurf_rental_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_white_dune_what_to_expect_paragraphs" ADD CONSTRAINT "kitesurf_trips_white_dune_what_to_expect_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_white_dune_how_it_works_items" ADD CONSTRAINT "kitesurf_trips_white_dune_how_it_works_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_secret_spot_what_to_expect_paragraphs" ADD CONSTRAINT "kitesurf_trips_secret_spot_what_to_expect_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_secret_spot_how_it_works_items" ADD CONSTRAINT "kitesurf_trips_secret_spot_how_it_works_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_oyster_farm_what_to_expect_paragraphs" ADD CONSTRAINT "kitesurf_trips_oyster_farm_what_to_expect_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_oyster_farm_how_it_works_items" ADD CONSTRAINT "kitesurf_trips_oyster_farm_how_it_works_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips_contact_info_text_lines" ADD CONSTRAINT "kitesurf_trips_contact_info_text_lines_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."kitesurf_trips"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "kitesurf_trips" ADD CONSTRAINT "kitesurf_trips_white_dune_image_id_media_id_fk" FOREIGN KEY ("white_dune_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_trips" ADD CONSTRAINT "kitesurf_trips_secret_spot_image_id_media_id_fk" FOREIGN KEY ("secret_spot_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_trips" ADD CONSTRAINT "kitesurf_trips_oyster_farm_image_id_media_id_fk" FOREIGN KEY ("oyster_farm_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "kitesurf_trips" ADD CONSTRAINT "kitesurf_trips_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "buchung_form_service_options" ADD CONSTRAINT "buchung_form_service_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."buchung"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "buchung" ADD CONSTRAINT "buchung_meta_image_id_media_id_fk" FOREIGN KEY ("meta_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "privacy_policy_page_sections_paragraphs" ADD CONSTRAINT "privacy_policy_page_sections_paragraphs_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_page_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "privacy_policy_page_sections" ADD CONSTRAINT "privacy_policy_page_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."privacy_policy_page"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "testimonials_updated_at_idx" ON "testimonials" USING btree ("updated_at");
  CREATE INDEX "testimonials_created_at_idx" ON "testimonials" USING btree ("created_at");
  CREATE INDEX "faqs_paragraphs_order_idx" ON "faqs_paragraphs" USING btree ("_order");
  CREATE INDEX "faqs_paragraphs_parent_id_idx" ON "faqs_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media" USING btree ("sizes_thumbnail_filename");
  CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media" USING btree ("sizes_card_filename");
  CREATE INDEX "media_sizes_hero_sizes_hero_filename_idx" ON "media" USING btree ("sizes_hero_filename");
  CREATE INDEX "media_sizes_og_sizes_og_filename_idx" ON "media" USING btree ("sizes_og_filename");
  CREATE INDEX "users_sessions_order_idx" ON "users_sessions" USING btree ("_order");
  CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions" USING btree ("_parent_id");
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_testimonials_id_idx" ON "payload_locked_documents_rels" USING btree ("testimonials_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");
  CREATE INDEX "startseite_services_icon_features_order_idx" ON "startseite_services_icon_features" USING btree ("_order");
  CREATE INDEX "startseite_services_icon_features_parent_id_idx" ON "startseite_services_icon_features" USING btree ("_parent_id");
  CREATE INDEX "startseite_services_cards_order_idx" ON "startseite_services_cards" USING btree ("_order");
  CREATE INDEX "startseite_services_cards_parent_id_idx" ON "startseite_services_cards" USING btree ("_parent_id");
  CREATE INDEX "startseite_services_cards_image_idx" ON "startseite_services_cards" USING btree ("image_id");
  CREATE INDEX "startseite_about_us_bullets_order_idx" ON "startseite_about_us_bullets" USING btree ("_order");
  CREATE INDEX "startseite_about_us_bullets_parent_id_idx" ON "startseite_about_us_bullets" USING btree ("_parent_id");
  CREATE INDEX "startseite_gallery_desktop_images_order_idx" ON "startseite_gallery_desktop_images" USING btree ("_order");
  CREATE INDEX "startseite_gallery_desktop_images_parent_id_idx" ON "startseite_gallery_desktop_images" USING btree ("_parent_id");
  CREATE INDEX "startseite_gallery_desktop_images_image_idx" ON "startseite_gallery_desktop_images" USING btree ("image_id");
  CREATE INDEX "startseite_gallery_mobile_carousel_images_order_idx" ON "startseite_gallery_mobile_carousel_images" USING btree ("_order");
  CREATE INDEX "startseite_gallery_mobile_carousel_images_parent_id_idx" ON "startseite_gallery_mobile_carousel_images" USING btree ("_parent_id");
  CREATE INDEX "startseite_gallery_mobile_carousel_images_image_idx" ON "startseite_gallery_mobile_carousel_images" USING btree ("image_id");
  CREATE INDEX "startseite_contact_info_text_lines_order_idx" ON "startseite_contact_info_text_lines" USING btree ("_order");
  CREATE INDEX "startseite_contact_info_text_lines_parent_id_idx" ON "startseite_contact_info_text_lines" USING btree ("_parent_id");
  CREATE INDEX "startseite_about_us_about_us_image_idx" ON "startseite" USING btree ("about_us_image_id");
  CREATE INDEX "startseite_meta_meta_image_idx" ON "startseite" USING btree ("meta_image_id");
  CREATE INDEX "all_inclusive_icon_features_order_idx" ON "all_inclusive_icon_features" USING btree ("_order");
  CREATE INDEX "all_inclusive_icon_features_parent_id_idx" ON "all_inclusive_icon_features" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_carousel_images_order_idx" ON "all_inclusive_carousel_images" USING btree ("_order");
  CREATE INDEX "all_inclusive_carousel_images_parent_id_idx" ON "all_inclusive_carousel_images" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_carousel_images_image_idx" ON "all_inclusive_carousel_images" USING btree ("image_id");
  CREATE INDEX "all_inclusive_included_items_order_idx" ON "all_inclusive_included_items" USING btree ("_order");
  CREATE INDEX "all_inclusive_included_items_parent_id_idx" ON "all_inclusive_included_items" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_not_included_items_order_idx" ON "all_inclusive_not_included_items" USING btree ("_order");
  CREATE INDEX "all_inclusive_not_included_items_parent_id_idx" ON "all_inclusive_not_included_items" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_price_table_rows_order_idx" ON "all_inclusive_price_table_rows" USING btree ("_order");
  CREATE INDEX "all_inclusive_price_table_rows_parent_id_idx" ON "all_inclusive_price_table_rows" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_contact_info_text_lines_order_idx" ON "all_inclusive_contact_info_text_lines" USING btree ("_order");
  CREATE INDEX "all_inclusive_contact_info_text_lines_parent_id_idx" ON "all_inclusive_contact_info_text_lines" USING btree ("_parent_id");
  CREATE INDEX "all_inclusive_meta_meta_image_idx" ON "all_inclusive" USING btree ("meta_image_id");
  CREATE INDEX "kitesurf_lessons_semi_private_description_order_idx" ON "kitesurf_lessons_semi_private_description" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_semi_private_description_parent_id_idx" ON "kitesurf_lessons_semi_private_description" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_semi_private_icon_features_order_idx" ON "kitesurf_lessons_semi_private_icon_features" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_semi_private_icon_features_parent_id_idx" ON "kitesurf_lessons_semi_private_icon_features" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_semi_private_price_rows_order_idx" ON "kitesurf_lessons_semi_private_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_semi_private_price_rows_parent_id_idx" ON "kitesurf_lessons_semi_private_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_private_description_order_idx" ON "kitesurf_lessons_private_description" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_private_description_parent_id_idx" ON "kitesurf_lessons_private_description" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_private_icon_features_order_idx" ON "kitesurf_lessons_private_icon_features" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_private_icon_features_parent_id_idx" ON "kitesurf_lessons_private_icon_features" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_private_price_rows_order_idx" ON "kitesurf_lessons_private_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_private_price_rows_parent_id_idx" ON "kitesurf_lessons_private_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_contact_info_text_lines_order_idx" ON "kitesurf_lessons_contact_info_text_lines" USING btree ("_order");
  CREATE INDEX "kitesurf_lessons_contact_info_text_lines_parent_id_idx" ON "kitesurf_lessons_contact_info_text_lines" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_lessons_meta_meta_image_idx" ON "kitesurf_lessons" USING btree ("meta_image_id");
  CREATE INDEX "kitesurf_rental_how_it_works_paragraphs_order_idx" ON "kitesurf_rental_how_it_works_paragraphs" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_how_it_works_paragraphs_parent_id_idx" ON "kitesurf_rental_how_it_works_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_icon_features_order_idx" ON "kitesurf_rental_icon_features" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_icon_features_parent_id_idx" ON "kitesurf_rental_icon_features" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_full_gear_price_rows_order_idx" ON "kitesurf_rental_full_gear_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_full_gear_price_rows_parent_id_idx" ON "kitesurf_rental_full_gear_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_kite_only_price_rows_order_idx" ON "kitesurf_rental_kite_only_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_kite_only_price_rows_parent_id_idx" ON "kitesurf_rental_kite_only_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_board_only_price_rows_order_idx" ON "kitesurf_rental_board_only_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_board_only_price_rows_parent_id_idx" ON "kitesurf_rental_board_only_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_insurance_price_rows_order_idx" ON "kitesurf_rental_insurance_price_rows" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_insurance_price_rows_parent_id_idx" ON "kitesurf_rental_insurance_price_rows" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_contact_info_text_lines_order_idx" ON "kitesurf_rental_contact_info_text_lines" USING btree ("_order");
  CREATE INDEX "kitesurf_rental_contact_info_text_lines_parent_id_idx" ON "kitesurf_rental_contact_info_text_lines" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_rental_meta_meta_image_idx" ON "kitesurf_rental" USING btree ("meta_image_id");
  CREATE INDEX "kitesurf_trips_white_dune_what_to_expect_paragraphs_order_idx" ON "kitesurf_trips_white_dune_what_to_expect_paragraphs" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_white_dune_what_to_expect_paragraphs_parent_id_idx" ON "kitesurf_trips_white_dune_what_to_expect_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_white_dune_how_it_works_items_order_idx" ON "kitesurf_trips_white_dune_how_it_works_items" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_white_dune_how_it_works_items_parent_id_idx" ON "kitesurf_trips_white_dune_how_it_works_items" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_secret_spot_what_to_expect_paragraphs_order_idx" ON "kitesurf_trips_secret_spot_what_to_expect_paragraphs" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_secret_spot_what_to_expect_paragraphs_parent_id_idx" ON "kitesurf_trips_secret_spot_what_to_expect_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_secret_spot_how_it_works_items_order_idx" ON "kitesurf_trips_secret_spot_how_it_works_items" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_secret_spot_how_it_works_items_parent_id_idx" ON "kitesurf_trips_secret_spot_how_it_works_items" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_oyster_farm_what_to_expect_paragraphs_order_idx" ON "kitesurf_trips_oyster_farm_what_to_expect_paragraphs" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_oyster_farm_what_to_expect_paragraphs_parent_id_idx" ON "kitesurf_trips_oyster_farm_what_to_expect_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_oyster_farm_how_it_works_items_order_idx" ON "kitesurf_trips_oyster_farm_how_it_works_items" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_oyster_farm_how_it_works_items_parent_id_idx" ON "kitesurf_trips_oyster_farm_how_it_works_items" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_contact_info_text_lines_order_idx" ON "kitesurf_trips_contact_info_text_lines" USING btree ("_order");
  CREATE INDEX "kitesurf_trips_contact_info_text_lines_parent_id_idx" ON "kitesurf_trips_contact_info_text_lines" USING btree ("_parent_id");
  CREATE INDEX "kitesurf_trips_white_dune_white_dune_image_idx" ON "kitesurf_trips" USING btree ("white_dune_image_id");
  CREATE INDEX "kitesurf_trips_secret_spot_secret_spot_image_idx" ON "kitesurf_trips" USING btree ("secret_spot_image_id");
  CREATE INDEX "kitesurf_trips_oyster_farm_oyster_farm_image_idx" ON "kitesurf_trips" USING btree ("oyster_farm_image_id");
  CREATE INDEX "kitesurf_trips_meta_meta_image_idx" ON "kitesurf_trips" USING btree ("meta_image_id");
  CREATE INDEX "buchung_form_service_options_order_idx" ON "buchung_form_service_options" USING btree ("_order");
  CREATE INDEX "buchung_form_service_options_parent_id_idx" ON "buchung_form_service_options" USING btree ("_parent_id");
  CREATE INDEX "buchung_meta_meta_image_idx" ON "buchung" USING btree ("meta_image_id");
  CREATE INDEX "privacy_policy_page_sections_paragraphs_order_idx" ON "privacy_policy_page_sections_paragraphs" USING btree ("_order");
  CREATE INDEX "privacy_policy_page_sections_paragraphs_parent_id_idx" ON "privacy_policy_page_sections_paragraphs" USING btree ("_parent_id");
  CREATE INDEX "privacy_policy_page_sections_order_idx" ON "privacy_policy_page_sections" USING btree ("_order");
  CREATE INDEX "privacy_policy_page_sections_parent_id_idx" ON "privacy_policy_page_sections" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "testimonials" CASCADE;
  DROP TABLE "faqs_paragraphs" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "users_sessions" CASCADE;
  DROP TABLE "users" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "settings" CASCADE;
  DROP TABLE "startseite_services_icon_features" CASCADE;
  DROP TABLE "startseite_services_cards" CASCADE;
  DROP TABLE "startseite_about_us_bullets" CASCADE;
  DROP TABLE "startseite_gallery_desktop_images" CASCADE;
  DROP TABLE "startseite_gallery_mobile_carousel_images" CASCADE;
  DROP TABLE "startseite_contact_info_text_lines" CASCADE;
  DROP TABLE "startseite" CASCADE;
  DROP TABLE "all_inclusive_icon_features" CASCADE;
  DROP TABLE "all_inclusive_carousel_images" CASCADE;
  DROP TABLE "all_inclusive_included_items" CASCADE;
  DROP TABLE "all_inclusive_not_included_items" CASCADE;
  DROP TABLE "all_inclusive_price_table_rows" CASCADE;
  DROP TABLE "all_inclusive_contact_info_text_lines" CASCADE;
  DROP TABLE "all_inclusive" CASCADE;
  DROP TABLE "kitesurf_lessons_semi_private_description" CASCADE;
  DROP TABLE "kitesurf_lessons_semi_private_icon_features" CASCADE;
  DROP TABLE "kitesurf_lessons_semi_private_price_rows" CASCADE;
  DROP TABLE "kitesurf_lessons_private_description" CASCADE;
  DROP TABLE "kitesurf_lessons_private_icon_features" CASCADE;
  DROP TABLE "kitesurf_lessons_private_price_rows" CASCADE;
  DROP TABLE "kitesurf_lessons_contact_info_text_lines" CASCADE;
  DROP TABLE "kitesurf_lessons" CASCADE;
  DROP TABLE "kitesurf_rental_how_it_works_paragraphs" CASCADE;
  DROP TABLE "kitesurf_rental_icon_features" CASCADE;
  DROP TABLE "kitesurf_rental_full_gear_price_rows" CASCADE;
  DROP TABLE "kitesurf_rental_kite_only_price_rows" CASCADE;
  DROP TABLE "kitesurf_rental_board_only_price_rows" CASCADE;
  DROP TABLE "kitesurf_rental_insurance_price_rows" CASCADE;
  DROP TABLE "kitesurf_rental_contact_info_text_lines" CASCADE;
  DROP TABLE "kitesurf_rental" CASCADE;
  DROP TABLE "kitesurf_trips_white_dune_what_to_expect_paragraphs" CASCADE;
  DROP TABLE "kitesurf_trips_white_dune_how_it_works_items" CASCADE;
  DROP TABLE "kitesurf_trips_secret_spot_what_to_expect_paragraphs" CASCADE;
  DROP TABLE "kitesurf_trips_secret_spot_how_it_works_items" CASCADE;
  DROP TABLE "kitesurf_trips_oyster_farm_what_to_expect_paragraphs" CASCADE;
  DROP TABLE "kitesurf_trips_oyster_farm_how_it_works_items" CASCADE;
  DROP TABLE "kitesurf_trips_contact_info_text_lines" CASCADE;
  DROP TABLE "kitesurf_trips" CASCADE;
  DROP TABLE "buchung_form_service_options" CASCADE;
  DROP TABLE "buchung" CASCADE;
  DROP TABLE "imprint_page" CASCADE;
  DROP TABLE "privacy_policy_page_sections_paragraphs" CASCADE;
  DROP TABLE "privacy_policy_page_sections" CASCADE;
  DROP TABLE "privacy_policy_page" CASCADE;
  DROP TYPE "public"."enum_users_role";`)
}
