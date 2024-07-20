import { relations } from 'drizzle-orm/relations';
import {
  Profile,
  SensitiveProfileData,
  SimilarProfile,
  SharedRawProfile,
  TalentPool,
  AccomplishmentOrg,
  Activity,
  Category,
  CategoryScore,
  Article,
  Job,
  CandidateStage,
  Client,
  Certification,
  CompanyProductCategory,
  Company,
  Product,
  Course,
  Education,
  Experience,
  Group,
  HonourAward,
  Interview,
  JobHistory,
  ProfileOrg,
  Language,
  LinkedInProfileViews,
  Patent,
  PeopleAlsoViewed,
  Project,
  Publication,
  RecentCategoryScore,
  TestScore,
  VolunteerWork,
  _JobCandidates,
} from './schema';

export const SensitiveProfileDataRelations = relations(
  SensitiveProfileData,
  ({ one }) => ({
    Profile: one(Profile, {
      fields: [SensitiveProfileData.profileId],
      references: [Profile.id],
    }),
  }),
);

export const ProfileRelations = relations(Profile, ({ one, many }) => ({
  SensitiveProfileData: many(SensitiveProfileData),
  SimilarProfiles: many(SimilarProfile),
  TalentPool: one(TalentPool, {
    fields: [Profile.talentPoolId],
    references: [TalentPool.id],
  }),
  AccomplishmentOrgs: many(AccomplishmentOrg),
  Activities: many(Activity),
  CategoryScores: many(CategoryScore),
  Articles: many(Article),
  CandidateStages: many(CandidateStage),
  Certifications: many(Certification),
  Courses: many(Course),
  Educations: many(Education),
  Experiences: many(Experience),
  Groups: many(Group),
  HonourAwards: many(HonourAward),
  ProfileOrgs: many(ProfileOrg),
  Languages: many(Language),
  LinkedInProfileViews: many(LinkedInProfileViews),
  Patents: many(Patent),
  PeopleAlsoVieweds: many(PeopleAlsoViewed),
  Projects: many(Project),
  Publications: many(Publication),
  RecentCategoryScores: many(RecentCategoryScore),
  TestScores: many(TestScore),
  VolunteerWorks: many(VolunteerWork),
  _JobCandidates: many(_JobCandidates),
}));

export const SimilarProfileRelations = relations(SimilarProfile, ({ one }) => ({
  Profile: one(Profile, {
    fields: [SimilarProfile.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [SimilarProfile.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const SharedRawProfileRelations = relations(
  SharedRawProfile,
  ({ many }) => ({
    SimilarProfiles: many(SimilarProfile),
    AccomplishmentOrgs: many(AccomplishmentOrg),
    Activities: many(Activity),
    CategoryScores: many(CategoryScore),
    Articles: many(Article),
    Certifications: many(Certification),
    Courses: many(Course),
    Educations: many(Education),
    Experiences: many(Experience),
    Groups: many(Group),
    HonourAwards: many(HonourAward),
    Languages: many(Language),
    LinkedInProfileViews: many(LinkedInProfileViews),
    Patents: many(Patent),
    PeopleAlsoVieweds: many(PeopleAlsoViewed),
    Projects: many(Project),
    Publications: many(Publication),
    RecentCategoryScores: many(RecentCategoryScore),
    TestScores: many(TestScore),
    VolunteerWorks: many(VolunteerWork),
  }),
);

export const TalentPoolRelations = relations(TalentPool, ({ many }) => ({
  Profiles: many(Profile),
}));

export const AccomplishmentOrgRelations = relations(
  AccomplishmentOrg,
  ({ one }) => ({
    Profile: one(Profile, {
      fields: [AccomplishmentOrg.profileId],
      references: [Profile.id],
    }),
    SharedRawProfile: one(SharedRawProfile, {
      fields: [AccomplishmentOrg.sharedRawProfileId],
      references: [SharedRawProfile.id],
    }),
  }),
);

export const ActivityRelations = relations(Activity, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Activity.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Activity.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const CategoryScoreRelations = relations(CategoryScore, ({ one }) => ({
  Category: one(Category, {
    fields: [CategoryScore.categoryId],
    references: [Category.id],
  }),
  Profile: one(Profile, {
    fields: [CategoryScore.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [CategoryScore.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const CategoryRelations = relations(Category, ({ many }) => ({
  CategoryScores: many(CategoryScore),
  CompanyProductCategories: many(CompanyProductCategory),
  RecentCategoryScores: many(RecentCategoryScore),
}));

export const ArticleRelations = relations(Article, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Article.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Article.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const CandidateStageRelations = relations(
  CandidateStage,
  ({ one, many }) => ({
    Job: one(Job, {
      fields: [CandidateStage.jobId],
      references: [Job.id],
    }),
    Profile: one(Profile, {
      fields: [CandidateStage.profileId],
      references: [Profile.id],
    }),
    Interviews: many(Interview),
  }),
);

export const JobRelations = relations(Job, ({ one, many }) => ({
  CandidateStages: many(CandidateStage),
  Client: one(Client, {
    fields: [Job.clientId],
    references: [Client.id],
  }),
  JobHistories: many(JobHistory),
  _JobCandidates: many(_JobCandidates),
}));

export const ClientRelations = relations(Client, ({ many }) => ({
  Jobs: many(Job),
}));

export const CertificationRelations = relations(Certification, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Certification.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Certification.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const CompanyProductCategoryRelations = relations(
  CompanyProductCategory,
  ({ one }) => ({
    Category: one(Category, {
      fields: [CompanyProductCategory.categoryId],
      references: [Category.id],
    }),
    Company: one(Company, {
      fields: [CompanyProductCategory.companyId],
      references: [Company.id],
    }),
    Product: one(Product, {
      fields: [CompanyProductCategory.productId],
      references: [Product.id],
    }),
  }),
);

export const CompanyRelations = relations(Company, ({ many }) => ({
  CompanyProductCategories: many(CompanyProductCategory),
  Products: many(Product),
}));

export const ProductRelations = relations(Product, ({ one, many }) => ({
  CompanyProductCategories: many(CompanyProductCategory),
  Company: one(Company, {
    fields: [Product.companyId],
    references: [Company.id],
  }),
}));

export const CourseRelations = relations(Course, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Course.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Course.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const EducationRelations = relations(Education, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Education.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Education.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const ExperienceRelations = relations(Experience, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Experience.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Experience.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const GroupRelations = relations(Group, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Group.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Group.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const HonourAwardRelations = relations(HonourAward, ({ one }) => ({
  Profile: one(Profile, {
    fields: [HonourAward.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [HonourAward.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const InterviewRelations = relations(Interview, ({ one }) => ({
  CandidateStage: one(CandidateStage, {
    fields: [Interview.candidateStageId],
    references: [CandidateStage.id],
  }),
}));

export const JobHistoryRelations = relations(JobHistory, ({ one }) => ({
  Job: one(Job, {
    fields: [JobHistory.jobId],
    references: [Job.id],
  }),
}));

export const ProfileOrgRelations = relations(ProfileOrg, ({ one }) => ({
  Profile: one(Profile, {
    fields: [ProfileOrg.profileId],
    references: [Profile.id],
  }),
}));

export const LanguageRelations = relations(Language, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Language.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Language.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const LinkedInProfileViewsRelations = relations(
  LinkedInProfileViews,
  ({ one }) => ({
    Profile: one(Profile, {
      fields: [LinkedInProfileViews.profileId],
      references: [Profile.id],
    }),
    SharedRawProfile: one(SharedRawProfile, {
      fields: [LinkedInProfileViews.sharedRawProfileId],
      references: [SharedRawProfile.id],
    }),
  }),
);

export const PatentRelations = relations(Patent, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Patent.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Patent.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const PeopleAlsoViewedRelations = relations(
  PeopleAlsoViewed,
  ({ one }) => ({
    Profile: one(Profile, {
      fields: [PeopleAlsoViewed.profileId],
      references: [Profile.id],
    }),
    SharedRawProfile: one(SharedRawProfile, {
      fields: [PeopleAlsoViewed.sharedRawProfileId],
      references: [SharedRawProfile.id],
    }),
  }),
);

export const ProjectRelations = relations(Project, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Project.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Project.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const PublicationRelations = relations(Publication, ({ one }) => ({
  Profile: one(Profile, {
    fields: [Publication.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [Publication.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const RecentCategoryScoreRelations = relations(
  RecentCategoryScore,
  ({ one }) => ({
    Category: one(Category, {
      fields: [RecentCategoryScore.categoryId],
      references: [Category.id],
    }),
    Profile: one(Profile, {
      fields: [RecentCategoryScore.profileId],
      references: [Profile.id],
    }),
    SharedRawProfile: one(SharedRawProfile, {
      fields: [RecentCategoryScore.sharedRawProfileId],
      references: [SharedRawProfile.id],
    }),
  }),
);

export const TestScoreRelations = relations(TestScore, ({ one }) => ({
  Profile: one(Profile, {
    fields: [TestScore.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [TestScore.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const VolunteerWorkRelations = relations(VolunteerWork, ({ one }) => ({
  Profile: one(Profile, {
    fields: [VolunteerWork.profileId],
    references: [Profile.id],
  }),
  SharedRawProfile: one(SharedRawProfile, {
    fields: [VolunteerWork.sharedRawProfileId],
    references: [SharedRawProfile.id],
  }),
}));

export const _JobCandidatesRelations = relations(_JobCandidates, ({ one }) => ({
  Job: one(Job, {
    fields: [_JobCandidates.A],
    references: [Job.id],
  }),
  Profile: one(Profile, {
    fields: [_JobCandidates.B],
    references: [Profile.id],
  }),
}));
