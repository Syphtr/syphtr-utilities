import {
  pgTable,
  pgEnum,
  serial,
  text,
  timestamp,
  uniqueIndex,
  integer,
  doublePrecision,
  index,
  varchar,
} from 'drizzle-orm/pg-core';

export const CompanySize = pgEnum('CompanySize', [
  'SEED',
  'STARTUP',
  'SCALEUP',
  'MID_SIZE',
  'BIG',
  'HUGE',
]);
export const OutcomeResult = pgEnum('OutcomeResult', [
  'ONE',
  'TWO',
  'THREE',
  'FOUR',
  'FIVE',
]);
export const Stage = pgEnum('Stage', [
  'APPLIED',
  'ADDED',
  'ASK_SYPHTR_TO_REACH_OUT',
  'SCREENING',
  'SCREENED',
  'FIRST_INTERVIEW',
  'MID_INTERVIEWS',
  'FINAL_INTERVIEW',
  'HIRED',
]);

export const TalentPool = pgTable('TalentPool', {
  id: serial('id').primaryKey().notNull(),
  orgId: text('orgId').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  name: text('name').notNull(),
});

export const SensitiveProfileData = pgTable(
  'SensitiveProfileData',
  {
    id: serial('id').primaryKey().notNull(),
    email: text('email'),
    phone: text('phone'),
    cv: text('cv'),
    notes: text('notes'),
    profileId: integer('profileId')
      .notNull()
      .references(() => Profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    userId: text('userId'),
    orgId: text('orgId'),
  },
  (table) => {
    return {
      profileId_userId_key: uniqueIndex(
        'SensitiveProfileData_profileId_userId_key',
      ).using('btree', table.profileId, table.userId),
    };
  },
);

export const SimilarProfile = pgTable('SimilarProfile', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  name: text('name'),
  link: text('link'),
  summary: text('summary'),
  location: text('location'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Profile = pgTable(
  'Profile',
  {
    id: serial('id').primaryKey().notNull(),
    public_identifier: text('public_identifier'),
    first_name: text('first_name'),
    last_name: text('last_name'),
    full_name: text('full_name'),
    city: text('city'),
    state: text('state'),
    country: text('country'),
    country_full_name: text('country_full_name'),
    summary: text('summary'),
    profile_pic_url: text('profile_pic_url'),
    background_cover_image_url: text('background_cover_image_url'),
    headline: text('headline'),
    occupation: text('occupation'),
    connections: integer('connections'),
    follower_count: integer('follower_count'),
    recommendations: text('recommendations').array(),
    skills: text('skills').array(),
    last_updated: timestamp('last_updated', { precision: 3, mode: 'string' }),
    linkedin_profile_url: text('linkedin_profile_url').notNull(),
    talentPoolId: integer('talentPoolId').references(() => TalentPool.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    orgId: text('orgId'),
    userId: text('userId'),
    email_address: text('email_address'),
    phone_number: text('phone_number'),
    averageTenureScore: doublePrecision('averageTenureScore'),
    comfortZoneScore: doublePrecision('comfortZoneScore'),
    stabilityScoreDB: doublePrecision('stabilityScoreDB'),
  },
  (table) => {
    return {
      public_identifier_orgId_key: uniqueIndex(
        'Profile_public_identifier_orgId_key',
      ).using('btree', table.public_identifier, table.orgId),
    };
  },
);

export const AccomplishmentOrg = pgTable('AccomplishmentOrg', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  orgName: text('orgName'),
  title: text('title'),
  description: text('description'),
  startsAt: timestamp('startsAt', { precision: 3, mode: 'string' }),
  endsAt: timestamp('endsAt', { precision: 3, mode: 'string' }),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const SharedRawProfile = pgTable(
  'SharedRawProfile',
  {
    id: serial('id').primaryKey().notNull(),
    public_identifier: text('public_identifier'),
    linkedin_profile_url: text('linkedin_profile_url').notNull(),
    last_updated: timestamp('last_updated', { precision: 3, mode: 'string' }),
    first_name: text('first_name'),
    last_name: text('last_name'),
    full_name: text('full_name'),
    city: text('city'),
    state: text('state'),
    country: text('country'),
    country_full_name: text('country_full_name'),
    summary: text('summary'),
    profile_pic_url: text('profile_pic_url'),
    background_cover_image_url: text('background_cover_image_url'),
    headline: text('headline'),
    occupation: text('occupation'),
    connections: integer('connections'),
    follower_count: integer('follower_count'),
    recommendations: text('recommendations').array(),
    skills: text('skills').array(),
    stabilityScoreDB: doublePrecision('stabilityScoreDB'),
    comfortZoneScore: doublePrecision('comfortZoneScore'),
    averageTenureScore: doublePrecision('averageTenureScore'),
  },
  (table) => {
    return {
      averageTenureScore_idx: index(
        'SharedRawProfile_averageTenureScore_idx',
      ).using('btree', table.averageTenureScore),
      city_idx: index('SharedRawProfile_city_idx').using('btree', table.city),
      country_idx: index('SharedRawProfile_country_idx').using(
        'btree',
        table.country,
      ),
      first_name_idx: index('SharedRawProfile_first_name_idx').using(
        'btree',
        table.first_name,
      ),
      full_name_idx: index('SharedRawProfile_full_name_idx').using(
        'btree',
        table.full_name,
      ),
      last_name_idx: index('SharedRawProfile_last_name_idx').using(
        'btree',
        table.last_name,
      ),
      public_identifier_key: uniqueIndex(
        'SharedRawProfile_public_identifier_key',
      ).using('btree', table.public_identifier),
      state_idx: index('SharedRawProfile_state_idx').using(
        'btree',
        table.state,
      ),
    };
  },
);

export const Activity = pgTable('Activity', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  activityStatus: text('activityStatus'),
  link: text('link'),
  title: text('title'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const CategoryScore = pgTable(
  'CategoryScore',
  {
    id: serial('id').primaryKey().notNull(),
    categoryId: integer('categoryId')
      .notNull()
      .references(() => Category.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    sharedRawProfileId: integer('sharedRawProfileId')
      .notNull()
      .references(() => SharedRawProfile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    score: doublePrecision('score').notNull(),
    companies: text('companies').array(),
    categoryExperience: doublePrecision('categoryExperience').notNull(),
    categoryName: text('categoryName'),
    profileId: integer('profileId').references(() => Profile.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      categoryExperience_idx: index(
        'CategoryScore_categoryExperience_idx',
      ).using('btree', table.categoryExperience),
      categoryId_idx: index('CategoryScore_categoryId_idx').using(
        'btree',
        table.categoryId,
      ),
      categoryId_sharedRawProfileId_key: uniqueIndex(
        'CategoryScore_categoryId_sharedRawProfileId_key',
      ).using('btree', table.categoryId, table.sharedRawProfileId),
      sharedRawProfileId_idx: index(
        'CategoryScore_sharedRawProfileId_idx',
      ).using('btree', table.sharedRawProfileId),
    };
  },
);

export const Article = pgTable('Article', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  title: text('title'),
  link: text('link'),
  publishedDate: timestamp('publishedDate', { precision: 3, mode: 'string' }),
  author: text('author'),
  imageUrl: text('imageUrl'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const CandidateStage = pgTable(
  'CandidateStage',
  {
    id: serial('id').primaryKey().notNull(),
    profileId: integer('profileId')
      .notNull()
      .references(() => Profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    jobId: integer('jobId')
      .notNull()
      .references(() => Job.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
    stage: Stage('stage').notNull(),
    categoryScore: doublePrecision('categoryScore'),
    comfortZoneScore: doublePrecision('comfortZoneScore'),
    overallScore: doublePrecision('overallScore'),
    stabilityScore: doublePrecision('stabilityScore'),
    recentCategoryScore: doublePrecision('recentCategoryScore'),
    orgId: text('orgId'),
  },
  (table) => {
    return {
      profileId_jobId_key: uniqueIndex(
        'CandidateStage_profileId_jobId_key',
      ).using('btree', table.profileId, table.jobId),
    };
  },
);

export const Category = pgTable(
  'Category',
  {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
  },
  (table) => {
    return {
      name_key: uniqueIndex('Category_name_key').using('btree', table.name),
    };
  },
);

export const Job = pgTable('Job', {
  id: serial('id').primaryKey().notNull(),
  clientId: integer('clientId').references(() => Client.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  department: text('department'),
  businessUnit: text('businessUnit'),
  hiringTeam: text('hiringTeam').array(),
  title: text('title'),
  salary: integer('salary'),
  currency: text('currency'),
  openSince: timestamp('openSince', { precision: 3, mode: 'string' }),
  createdAt: timestamp('createdAt', {
    precision: 3,
    mode: 'string',
  }).defaultNow(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }),
  userId: text('userId'),
  description: text('description'),
  jobDescription: text('jobDescription'),
  location: text('location'),
  orgId: text('orgId'),
});

export const Certification = pgTable('Certification', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  authority: text('authority'),
  displaySource: text('displaySource'),
  endsAt: timestamp('endsAt', { precision: 3, mode: 'string' }),
  licenseNumber: text('licenseNumber'),
  name: text('name'),
  startsAt: timestamp('startsAt', { precision: 3, mode: 'string' }),
  url: text('url'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const CompanyProductCategory = pgTable(
  'CompanyProductCategory',
  {
    id: serial('id').primaryKey().notNull(),
    companyId: integer('companyId')
      .notNull()
      .references(() => Company.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    productId: integer('productId')
      .notNull()
      .references(() => Product.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    categoryId: integer('categoryId')
      .notNull()
      .references(() => Category.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    percentage: integer('percentage').notNull(),
  },
  (table) => {
    return {
      companyId_productId_categoryId_key: uniqueIndex(
        'CompanyProductCategory_companyId_productId_categoryId_key',
      ).using('btree', table.companyId, table.productId, table.categoryId),
    };
  },
);

export const Course = pgTable('Course', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  name: text('name'),
  number: text('number'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Company = pgTable(
  'Company',
  {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    targetMarketSize: text('targetMarketSize').notNull(),
    targetVertical: text('targetVertical').notNull(),
    size: CompanySize('size'),
  },
  (table) => {
    return {
      name_key: uniqueIndex('Company_name_key').using('btree', table.name),
    };
  },
);

export const Education = pgTable('Education', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  school: text('school'),
  degree_name: text('degree_name'),
  field_of_study: text('field_of_study'),
  starts_at: timestamp('starts_at', { precision: 3, mode: 'string' }),
  ends_at: timestamp('ends_at', { precision: 3, mode: 'string' }),
  description: text('description'),
  activities_and_societies: text('activities_and_societies'),
  grade: text('grade'),
  logo_url: text('logo_url'),
  school_linkedin_profile_url: text('school_linkedin_profile_url'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Experience = pgTable(
  'Experience',
  {
    id: serial('id').primaryKey().notNull(),
    profileId: integer('profileId').references(() => Profile.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    company: text('company'),
    title: text('title'),
    description: text('description'),
    location: text('location'),
    starts_at: timestamp('starts_at', { precision: 3, mode: 'string' }),
    ends_at: timestamp('ends_at', { precision: 3, mode: 'string' }),
    company_linkedin_profile_url: text('company_linkedin_profile_url'),
    logo_url: text('logo_url'),
    sharedRawProfileId: integer('sharedRawProfileId').references(
      () => SharedRawProfile.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      company_idx: index('Experience_company_idx').using(
        'btree',
        table.company,
      ),
      title_company_starts_at_ends_at_idx: index(
        'Experience_title_company_starts_at_ends_at_idx',
      ).using(
        'btree',
        table.title,
        table.company,
        table.starts_at,
        table.ends_at,
      ),
      title_idx: index('Experience_title_idx').using('btree', table.title),
    };
  },
);

export const Group = pgTable('Group', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  profilePicUrl: text('profilePicUrl'),
  name: text('name'),
  url: text('url'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const HonourAward = pgTable('HonourAward', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  title: text('title'),
  issuer: text('issuer'),
  issuedOn: timestamp('issuedOn', { precision: 3, mode: 'string' }),
  description: text('description'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Interview = pgTable('Interview', {
  id: serial('id').primaryKey().notNull(),
  candidateStageId: integer('candidateStageId').references(
    () => CandidateStage.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
  userId: text('userId'),
  date: timestamp('date', { precision: 3, mode: 'string' }),
  outcome: OutcomeResult('outcome'),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp('updatedAt', { precision: 3, mode: 'string' }).notNull(),
  interviewers: text('interviewers').array(),
  attendees: text('attendees').array(),
  endTime: timestamp('endTime', { precision: 3, mode: 'string' }),
  startTime: timestamp('startTime', { precision: 3, mode: 'string' }),
  messages: text('messages'),
  eventId: text('eventId'),
});

export const JobHistory = pgTable('JobHistory', {
  id: serial('id').primaryKey().notNull(),
  jobId: integer('jobId')
    .notNull()
    .references(() => Job.id, { onDelete: 'restrict', onUpdate: 'cascade' }),
  userId: text('userId').notNull(),
  action: text('action').notNull(),
  timestamp: timestamp('timestamp', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
  details: text('details').notNull(),
});

export const Client = pgTable(
  'Client',
  {
    id: serial('id').primaryKey().notNull(),
    name: text('name'),
  },
  (table) => {
    return {
      name_key: uniqueIndex('Client_name_key').using('btree', table.name),
    };
  },
);

export const ProfileOrg = pgTable(
  'ProfileOrg',
  {
    id: serial('id').primaryKey().notNull(),
    profileId: integer('profileId')
      .notNull()
      .references(() => Profile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    orgId: text('orgId').notNull(),
    public_identifier: text('public_identifier'),
  },
  (table) => {
    return {
      public_identifier_orgId_key: uniqueIndex(
        'ProfileOrg_public_identifier_orgId_key',
      ).using('btree', table.public_identifier, table.orgId),
    };
  },
);

export const Product = pgTable(
  'Product',
  {
    id: serial('id').primaryKey().notNull(),
    name: text('name').notNull(),
    companyId: integer('companyId')
      .notNull()
      .references(() => Company.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      name_key: uniqueIndex('Product_name_key').using('btree', table.name),
    };
  },
);

export const Language = pgTable('Language', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  language: text('language').notNull(),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const LinkedInProfileViews = pgTable(
  'LinkedInProfileViews',
  {
    id: serial('id').primaryKey().notNull(),
    profileId: integer('profileId').references(() => Profile.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
    orgId: text('orgId').notNull(),
    userId: text('userId'),
    viewedAt: timestamp('viewedAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    sharedRawProfileId: integer('sharedRawProfileId').references(
      () => SharedRawProfile.id,
      { onDelete: 'set null', onUpdate: 'cascade' },
    ),
  },
  (table) => {
    return {
      profileId: index('profileId').using('btree', table.profileId),
    };
  },
);

export const Patent = pgTable('Patent', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  title: text('title'),
  issuer: text('issuer'),
  issuedOn: timestamp('issuedOn', { precision: 3, mode: 'string' }),
  description: text('description'),
  applicationNumber: text('applicationNumber'),
  patentNumber: text('patentNumber'),
  url: text('url'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const PeopleAlsoViewed = pgTable('PeopleAlsoViewed', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  link: text('link'),
  name: text('name'),
  summary: text('summary'),
  location: text('location'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Project = pgTable('Project', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  title: text('title'),
  description: text('description'),
  url: text('url'),
  startsAt: timestamp('startsAt', { precision: 3, mode: 'string' }),
  endsAt: timestamp('endsAt', { precision: 3, mode: 'string' }),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const Publication = pgTable('Publication', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  name: text('name'),
  publisher: text('publisher'),
  publishedOn: timestamp('publishedOn', { precision: 3, mode: 'string' }),
  description: text('description'),
  url: text('url'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const RecentCategoryScore = pgTable(
  'RecentCategoryScore',
  {
    id: serial('id').primaryKey().notNull(),
    categoryId: integer('categoryId')
      .notNull()
      .references(() => Category.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    sharedRawProfileId: integer('sharedRawProfileId')
      .notNull()
      .references(() => SharedRawProfile.id, {
        onDelete: 'restrict',
        onUpdate: 'cascade',
      }),
    score: doublePrecision('score').notNull(),
    createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
      .defaultNow()
      .notNull(),
    profileId: integer('profileId').references(() => Profile.id, {
      onDelete: 'set null',
      onUpdate: 'cascade',
    }),
  },
  (table) => {
    return {
      sharedRawProfileId_categoryId_key: uniqueIndex(
        'RecentCategoryScore_sharedRawProfileId_categoryId_key',
      ).using('btree', table.sharedRawProfileId, table.categoryId),
      idx_recentCategoryScore: index('idx_recentCategoryScore').using(
        'btree',
        table.sharedRawProfileId,
        table.categoryId,
      ),
    };
  },
);

export const Notification = pgTable('Notification', {
  id: serial('id').primaryKey().notNull(),
  userId: text('userId').notNull(),
  profileId: integer('profileId').notNull(),
  profileName: text('profileName').notNull(),
  profilePicUrl: text('profilePicUrl').notNull(),
  message: text('message').notNull(),
  createdAt: timestamp('createdAt', { precision: 3, mode: 'string' })
    .defaultNow()
    .notNull(),
});

export const _prisma_migrations = pgTable('_prisma_migrations', {
  id: varchar('id', { length: 36 }).primaryKey().notNull(),
  checksum: varchar('checksum', { length: 64 }).notNull(),
  finished_at: timestamp('finished_at', { withTimezone: true, mode: 'string' }),
  migration_name: varchar('migration_name', { length: 255 }).notNull(),
  logs: text('logs'),
  rolled_back_at: timestamp('rolled_back_at', {
    withTimezone: true,
    mode: 'string',
  }),
  started_at: timestamp('started_at', { withTimezone: true, mode: 'string' })
    .defaultNow()
    .notNull(),
  applied_steps_count: integer('applied_steps_count').default(0).notNull(),
});

export const TestScore = pgTable('TestScore', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  name: text('name'),
  score: text('score'),
  dateOn: timestamp('dateOn', { precision: 3, mode: 'string' }),
  description: text('description'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const VolunteerWork = pgTable('VolunteerWork', {
  id: serial('id').primaryKey().notNull(),
  profileId: integer('profileId').references(() => Profile.id, {
    onDelete: 'set null',
    onUpdate: 'cascade',
  }),
  cause: text('cause'),
  company: text('company'),
  companyLinkedinProfileUrl: text('companyLinkedinProfileUrl'),
  description: text('description'),
  endsAt: timestamp('endsAt', { precision: 3, mode: 'string' }),
  logoUrl: text('logoUrl'),
  startsAt: timestamp('startsAt', { precision: 3, mode: 'string' }),
  title: text('title'),
  sharedRawProfileId: integer('sharedRawProfileId').references(
    () => SharedRawProfile.id,
    { onDelete: 'set null', onUpdate: 'cascade' },
  ),
});

export const _JobCandidates = pgTable(
  '_JobCandidates',
  {
    A: integer('A')
      .notNull()
      .references(() => Job.id, { onDelete: 'cascade', onUpdate: 'cascade' }),
    B: integer('B')
      .notNull()
      .references(() => Profile.id, {
        onDelete: 'cascade',
        onUpdate: 'cascade',
      }),
  },
  (table) => {
    return {
      AB_unique: uniqueIndex('_JobCandidates_AB_unique').using(
        'btree',
        table.A,
        table.B,
      ),
      B_idx: index().using('btree', table.B),
    };
  },
);
