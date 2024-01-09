import {
  FileTreeOutline,
  Domain,
  BookOutline,
  BookCogOutline,
  FileCogOutline,
  ViewGridOutline,
  ViewGrid,
  DotsGrid,
  AccountGroupOutline,
  FileCompare,
  FileDocumentMultipleOutline,
  AccountHardHatOutline,
  FlagOutline,
  SchoolOutline,
  HeadSnowflakeOutline
} from 'mdi-material-ui'

export const masterNavigation = () => {
  return [
    {
      sectionTitle: 'MasterData'
    },
    {
      title: 'Curriculums',
      icon: BookOutline,
      path: '/pages/masterdata/curriculums'
    },
    {
      title: 'Curriculum Tree',
      icon: FileTreeOutline,
      path: '/pages/masterdata/curriculumtree'
      // openInNewTab: true
    },
    {
      title: 'Curriculum Structures',
      icon: BookCogOutline,
      path: '/pages/masterdata/curriculumstructure'
      // openInNewTab: true
    },
    {
      title: 'Subject Structures',
      icon: FileCogOutline,
      path: '/pages/masterdata/subjectstructures'
      // openInNewTab: true
    },
    {
      title: 'Faculty',
      icon: Domain,
      path: '/pages/masterdata/faculty'
      // openInNewTab: true
    },

    {
      title: 'Subject Categories',
      icon: ViewGridOutline,
      path: '/pages/masterdata/subjectcategories'
      // openInNewTab: true
    },
    {
      title: 'Subject Types',
      icon: ViewGrid,
      path: '/pages/masterdata/subjecttypes'
      // openInNewTab: true
    },
    {
      title: 'Subject Groups',
      icon: DotsGrid,
      path: '/pages/masterdata/subjectgroups'
      // openInNewTab: true
    },
    {
      title: 'Student Groups',
      icon: AccountGroupOutline,
      path: '/pages/masterdata/studentgroups'
      // openInNewTab: true
    },
    {
      title: 'YLOs PLOs',
      icon: FileCompare,
      path: '/pages/masterdata/yloplo'
      // openInNewTab: true
    }
  ]
}
export const surveysNavigation = () => {
  return [
    {
      sectionTitle: 'Surveys'
    },
    {
      title: 'Interest Surveys',
      icon: FileDocumentMultipleOutline,
      path: '/pages/surveys/interestsurveys'
    }
    // {
    //   title: 'Feedbacks',
    //   icon: BookOutline,
    //   path: '/pages/surveys/feedbacks'
    // }
  ]
}

export const jobSubjectRelatedNavigation = () => {
  return [
    {
      title: 'Job & Subject Related',
      icon: AccountHardHatOutline,
      path: '/pages/job-subjectrelated'
    }
  ]
}
export const studentSystemNavigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: FlagOutline,
      path: '/pages/front-office/student-systems/dashboard'
    },
    {
      title: 'StudyPlan(แผนการเรียน)',
      icon: SchoolOutline,
      path: '/pages/front-office/student-systems/studyplans'
    },
    {
      title: 'Competencies(สมรรถนะ)',
      icon: HeadSnowflakeOutline,
      path: '/pages/front-office/student-systems/competencies'
    }
  ]
}
