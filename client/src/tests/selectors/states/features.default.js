export default {
  features: {
    isFeaturesLoading: false,
    isModelPredictionLoading: false,
    isCategoriesLoading: false,
    categories: [
      {
        name: 'roles',
        color: null,
        abbreviation: 'RO',
      },
      {
        name: 'demographics',
        color: null,
        abbreviation: 'DG',
      },
      {
        name: 'current referral',
        color: null,
        abbreviation: 'CR',
      },
      {
        name: 'placement history',
        color: null,
        abbreviation: 'PH',
      },
      {
        name: 'referral history',
        color: null,
        abbreviation: 'RH',
      },
      {
        name: 'founded allegation history',
        color: null,
        abbreviation: 'AH',
      },
      {
        name: 'child welfare active',
        color: null,
        abbreviation: 'CW',
      },
      {
        name: 'juvenile justice',
        color: null,
        abbreviation: 'JJ',
      },
      {
        name: 'dependency court',
        color: null,
        abbreviation: 'DC',
      },
      {
        name: 'program involvement',
        color: null,
        abbreviation: 'PI',
      },
      {
        name: 'sanctions',
        color: null,
        abbreviation: 'SA',
      },
      {
        name: 'diversion payments',
        color: null,
        abbreviation: 'DP',
      },
    ],
    newFeatureScore: null,
    featuresData: [
      {
        name: 'PRI_FOCUS_AGE_AT_REFERRAL',
        description: 'Age of the child in focus at time of referral',
        type: 'numeric',
        negated_description: null,
        category: 'demographics',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST90_DUMMY',
        description: 'The child in focus had a child welfare placement in the last 90 days',
        type: 'binary',
        negated_description: 'The child in focus has NOT had a child welfare placement in the last 90 days',
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST180_DUMMY',
        description: 'The child in focus had a child welfare placement in the last 180 days',
        type: 'binary',
        negated_description: 'The child in focus has NOT had a child welfare placement in the last 180 days',
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST365_DUMMY',
        description: 'The child in focus had a child welfare placement in the last 365 days',
        type: 'binary',
        negated_description: 'The child in focus has NOT had a child welfare placement in the last 365 days',
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST730_DUMMY',
        description: 'The child in focus had a child welfare placement in the last 730 days',
        type: 'binary',
        negated_description: 'The child in focus has NOT had a child welfare placement in the last 730 days',
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST90_LOS',
        description: 'Count of days the child in focus was in a child welfare placement in the last 90 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST90_COUNT',
        description: 'Count of child welfare placement episodes the child in focus had in the last 90 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST180_LOS',
        description: 'Count of days the child in focus was in a child welfare placement in the last 180 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST180_COUNT',
        description: 'Count of child welfare placement episodes the child in focus had in the last 180 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST365_LOS',
        description: 'Count of days the child in focus was in a child welfare placement in the last 365 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST365_COUNT',
        description: 'Count of child welfare placement episodes the child in focus had in the last 365 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST730_LOS',
        description: 'Count of days the child in focus was in a child welfare placement in the last 730 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_PAST730_COUNT',
        description: 'Count of child welfare placement episodes the child in focus had in the last 730 days',
        type: 'numeric',
        negated_description: null,
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_PLSM_EVER',
        description:
          'Child in focus has ever had an out of home placement. Only includes placements more than 2 years prior to referral date.',
        type: 'binary',
        negated_description:
          'Child in focus has never had an out of home placement. Only includes placements more than 2 years prior to referral date.',
        category: 'placement history',
      },
      {
        name: 'PRI_FOCUS_REFSCI_PAST90_COUNT',
        description: 'Count of prior referrals the focus child in the last 90 days that were screened in',
        type: 'numeric',
        negated_description: null,
        category: 'referral history',
      },
      {
        name: 'PRI_FOCUS_REFSCI_PAST180_COUNT',
        description: 'Count of prior referrals the focus child in the last 180 days that were screened in',
        type: 'numeric',
        negated_description: null,
        category: 'referral history',
      },
      {
        name: 'PRI_FOCUS_REFSCI_PAST365_COUNT',
        description: 'Count of prior referrals the focus child in the last 365 days that were screened in',
        type: 'numeric',
        negated_description: null,
        category: 'referral history',
      },
      {
        name: 'PRI_FOCUS_REFSCI_PAST730_COUNT',
        description: 'Count of prior referrals the focus child in the last 730 days that were screened in',
        type: 'numeric',
        negated_description: null,
        category: 'referral history',
      },
    ],
    featuresImportances: {
      PRI_FOCUS_AGE_AT_REFERRAL: 0,
      PRI_FOCUS_PLSM_PAST90_DUMMY: 0.010154942842355652,
      PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
      PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
      PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
      PRI_FOCUS_PLSM_PAST90_LOS: 0.08042322147600664,
      PRI_FOCUS_PLSM_PAST90_COUNT: 0.008524681831138992,
      PRI_FOCUS_PLSM_PAST180_LOS: 0,
      PRI_FOCUS_PLSM_PAST180_COUNT: 0,
      PRI_FOCUS_PLSM_PAST365_LOS: 0,
      PRI_FOCUS_PLSM_PAST365_COUNT: 0,
      PRI_FOCUS_PLSM_PAST730_LOS: 0,
      PRI_FOCUS_PLSM_PAST730_COUNT: 0,
      PRI_FOCUS_PLSM_EVER: 0,
      PRI_FOCUS_REFSCI_PAST90_COUNT: 0,
      PRI_FOCUS_REFSCI_PAST180_COUNT: 0,
      PRI_FOCUS_REFSCI_PAST365_COUNT: 0,
      PRI_FOCUS_REFSCI_PAST730_COUNT: 0,
    },
    currentModelPrediction: [
      ['PRI_FOCUS_PLSM_PAST90_DUMMY', 10],
      ['PRI_FOCUS_PLSM_PAST180_DUMMY', 10],
      ['PRI_FOCUS_PLSM_PAST365_DUMMY', 10],
      ['PRI_FOCUS_PLSM_PAST730_DUMMY', 10],
      ['PRI_FOCUS_PLSM_EVER', 10],
      ['PRI_FOCUS_CYF_ACTIVE', 10],
      ['PRI_FOCUS_JUVENILE_JUSTICE', 10],
      ['PRI_FOCUS_COURT_ACTIVE', 10],
      ['PRI_PRNT_REF_AS_CHILD', 10],
      ['PRI_PRNT_PLSM_AS_CHILD', 10],
      ['PRI_PRNT_CYF_ACTIVE', 10],
      ['PRI_PERP_REF_AS_CHILD', 10],
      ['PRI_PERP_PLSM_AS_CHILD', 10],
      ['PRI_OTHC_GENDER_MISS_COUNT', 10],
      ['PRI_OTHC_CYF_ACTIVE', 10],
      ['PRI_OTHA_REF_AS_CHILD', 10],
      ['PRI_OTHA_PLSM_AS_CHILD', 10],
      ['PRI_OTHA_CYF_ACTIVE', 10],
      ['PRI_CBMS_FOCUS_CD_NOW', 10],
      ['PRI_CBMS_FOCUS_CD_1', 10],
      ['PRI_CBMS_FOCUS_CD_EVER', 10],
      ['PRI_CBMS_FOCUS_CH_NOW', 10],
      ['PRI_CBMS_FOCUS_CH_1', 10],
      ['PRI_CBMS_FOCUS_CH_EVER', 10],
      ['PRI_CBMS_FOCUS_CP_NOW', 10],
      ['PRI_CBMS_FOCUS_CP_1', 10],
      ['PRI_CBMS_FOCUS_CP_EVER', 10],
      ['PRI_CBMS_FOCUS_CW_NOW', 10],
      ['PRI_CBMS_FOCUS_CW_1', 10],
      ['PRI_CBMS_FOCUS_CW_EVER', 10],
      ['PRI_CBMS_FOCUS_DF_NOW', 10],
      ['PRI_CBMS_FOCUS_DF_1', 10],
      ['PRI_CBMS_FOCUS_DF_EVER', 10],
      ['PRI_CBMS_FOCUS_EX_NOW', 10],
      ['PRI_CBMS_FOCUS_EX_1', 10],
      ['PRI_CBMS_FOCUS_EX_EVER', 10],
      ['PRI_CBMS_FOCUS_FM_NOW', 10],
      ['PRI_CBMS_FOCUS_FM_1', 10],
      ['PRI_CBMS_FOCUS_FM_EVER', 10],
      ['PRI_CBMS_FOCUS_FP_NOW', 10],
      ['PRI_CBMS_FOCUS_FP_1', 10],
      ['PRI_CBMS_FOCUS_FP_EVER', 10],
      ['PRI_CBMS_FOCUS_FS_NOW', 10],
      ['PRI_CBMS_FOCUS_FS_1', 10],
      ['PRI_CBMS_FOCUS_FS_EVER', 10],
      ['PRI_CBMS_FOCUS_FT_NOW', 10],
      ['PRI_CBMS_FOCUS_FT_1', 10],
      ['PRI_CBMS_FOCUS_FT_EVER', 10],
      ['PRI_CBMS_FOCUS_LS_NOW', 10],
      ['PRI_CBMS_FOCUS_LS_1', 10],
      ['PRI_CBMS_FOCUS_LS_EVER', 10],
      ['PRI_CBMS_FOCUS_LT_NOW', 10],
      ['PRI_CBMS_FOCUS_LT_1', 10],
      ['PRI_CBMS_FOCUS_LT_EVER', 10],
      ['PRI_CBMS_FOCUS_MA_NOW', 10],
      ['PRI_CBMS_FOCUS_MA_1', 10],
      ['PRI_CBMS_FOCUS_MA_EVER', 10],
      ['PRI_CBMS_FOCUS_MS_NOW', 10],
      ['PRI_CBMS_FOCUS_MS_1', 10],
      ['PRI_CBMS_FOCUS_MS_EVER', 10],
      ['PRI_CBMS_FOCUS_NM_NOW', 10],
      ['PRI_CBMS_FOCUS_NM_1', 10],
      ['PRI_CBMS_FOCUS_NM_EVER', 10],
      ['PRI_CBMS_FOCUS_PE_NOW', 10],
      ['PRI_CBMS_FOCUS_PE_1', 10],
      ['PRI_CBMS_FOCUS_PE_EVER', 10],
      ['PRI_CBMS_FOCUS_WW_NOW', 10],
      ['PRI_CBMS_FOCUS_WW_1', 10],
      ['PRI_CBMS_FOCUS_WW_EVER', 10],
      ['PRI_CBMS_FOCUS_CD_DENY', 10],
      ['PRI_CBMS_FOCUS_CH_DENY', 10],
      ['PRI_CBMS_FOCUS_CP_DENY', 10],
      ['PRI_CBMS_FOCUS_CW_DENY', 10],
      ['PRI_CBMS_FOCUS_DF_DENY', 10],
      ['PRI_CBMS_FOCUS_EX_DENY', 10],
      ['PRI_CBMS_FOCUS_FM_DENY', 10],
      ['PRI_CBMS_FOCUS_FP_DENY', 10],
      ['PRI_CBMS_FOCUS_FS_DENY', 10],
      ['PRI_CBMS_FOCUS_FT_DENY', 10],
      ['PRI_CBMS_FOCUS_LS_DENY', 10],
      ['PRI_CBMS_FOCUS_LT_DENY', 10],
      ['PRI_CBMS_FOCUS_MA_DENY', 10],
      ['PRI_CBMS_FOCUS_MS_DENY', 10],
      ['PRI_CBMS_FOCUS_NM_DENY', 10],
      ['PRI_CBMS_FOCUS_PE_DENY', 10],
      ['PRI_CBMS_FOCUS_WW_DENY', 10],
      ['PRI_CBMS_ADULT_AF_NOW', 10],
      ['PRI_CBMS_ADULT_AF_1', 10],
      ['PRI_CBMS_ADULT_AF_EVER', 10],
      ['PRI_CBMS_ADULT_AM_NOW', 10],
      ['PRI_CBMS_ADULT_AM_1', 10],
      ['PRI_CBMS_ADULT_AM_EVER', 10],
      ['PRI_CBMS_ADULT_AP_NOW', 10],
      ['PRI_CBMS_ADULT_AP_1', 10],
      ['PRI_CBMS_ADULT_AP_EVER', 10],
      ['PRI_CBMS_ADULT_CD_NOW', 10],
      ['PRI_CBMS_ADULT_CD_1', 10],
      ['PRI_CBMS_ADULT_CD_EVER', 10],
      ['PRI_CBMS_ADULT_CH_NOW', 10],
      ['PRI_CBMS_ADULT_CH_1', 10],
      ['PRI_CBMS_ADULT_CH_EVER', 10],
      ['PRI_CBMS_ADULT_CP_NOW', 10],
      ['PRI_CBMS_ADULT_CP_1', 10],
      ['PRI_CBMS_ADULT_CP_EVER', 10],
      ['PRI_CBMS_ADULT_CW_NOW', 10],
      ['PRI_CBMS_ADULT_CW_1', 10],
      ['PRI_CBMS_ADULT_CW_EVER', 10],
      ['PRI_CBMS_ADULT_DF_NOW', 10],
      ['PRI_CBMS_ADULT_DF_1', 10],
      ['PRI_CBMS_ADULT_DF_EVER', 10],
      ['PRI_CBMS_ADULT_EX_NOW', 10],
      ['PRI_CBMS_ADULT_EX_1', 10],
      ['PRI_CBMS_ADULT_EX_EVER', 10],
      ['PRI_CBMS_ADULT_FM_NOW', 10],
      ['PRI_CBMS_ADULT_FM_1', 10],
      ['PRI_CBMS_ADULT_FM_EVER', 10],
      ['PRI_CBMS_ADULT_FP_NOW', 10],
      ['PRI_CBMS_ADULT_FP_1', 10],
      ['PRI_CBMS_ADULT_FP_EVER', 10],
      ['PRI_CBMS_ADULT_FS_NOW', 10],
      ['PRI_CBMS_ADULT_FS_1', 10],
      ['PRI_CBMS_ADULT_FS_EVER', 10],
      ['PRI_CBMS_ADULT_FT_NOW', 10],
      ['PRI_CBMS_ADULT_FT_1', 10],
      ['PRI_CBMS_ADULT_FT_EVER', 10],
      ['PRI_CBMS_ADULT_LS_NOW', 10],
      ['PRI_CBMS_ADULT_LS_1', 10],
      ['PRI_CBMS_ADULT_LS_EVER', 10],
      ['PRI_CBMS_ADULT_LT_NOW', 10],
      ['PRI_CBMS_ADULT_LT_1', 10],
      ['PRI_CBMS_ADULT_LT_EVER', 10],
      ['PRI_CBMS_ADULT_MA_NOW', 10],
      ['PRI_CBMS_ADULT_MA_1', 10],
      ['PRI_CBMS_ADULT_MA_EVER', 10],
      ['PRI_CBMS_ADULT_MS_NOW', 10],
      ['PRI_CBMS_ADULT_MS_1', 10],
      ['PRI_CBMS_ADULT_MS_EVER', 10],
      ['PRI_CBMS_ADULT_NM_NOW', 10],
      ['PRI_CBMS_ADULT_NM_1', 10],
      ['PRI_CBMS_ADULT_NM_EVER', 10],
      ['PRI_CBMS_ADULT_PE_NOW', 10],
      ['PRI_CBMS_ADULT_PE_1', 10],
      ['PRI_CBMS_ADULT_PE_EVER', 10],
      ['PRI_CBMS_ADULT_WW_NOW', 10],
      ['PRI_CBMS_ADULT_WW_1', 10],
      ['PRI_CBMS_ADULT_WW_EVER', 10],
    ],
    reversedModelPrediction: [
      ['PRI_FOCUS_PLSM_PAST90_DUMMY', 9],
      ['PRI_FOCUS_PLSM_PAST180_DUMMY', 10],
      ['PRI_FOCUS_PLSM_PAST365_DUMMY', 10],
      ['PRI_FOCUS_PLSM_PAST730_DUMMY', 12],
      ['PRI_FOCUS_PLSM_EVER', 13],
      ['PRI_FOCUS_CYF_ACTIVE', 10],
      ['PRI_FOCUS_JUVENILE_JUSTICE', 14],
      ['PRI_FOCUS_COURT_ACTIVE', 4],
      ['PRI_PRNT_REF_AS_CHILD', 10],
      ['PRI_PRNT_PLSM_AS_CHILD', 10],
      ['PRI_PRNT_CYF_ACTIVE', 10],
      ['PRI_PERP_REF_AS_CHILD', 10],
      ['PRI_PERP_PLSM_AS_CHILD', 10],
      ['PRI_OTHC_GENDER_MISS_COUNT', 12],
      ['PRI_OTHC_CYF_ACTIVE', 10],
      ['PRI_OTHA_REF_AS_CHILD', 10],
      ['PRI_OTHA_PLSM_AS_CHILD', 10],
      ['PRI_OTHA_CYF_ACTIVE', 10],
      ['PRI_CBMS_FOCUS_CD_NOW', 11],
      ['PRI_CBMS_FOCUS_CD_1', 10],
      ['PRI_CBMS_FOCUS_CD_EVER', 10],
      ['PRI_CBMS_FOCUS_CH_NOW', 9],
      ['PRI_CBMS_FOCUS_CH_1', 10],
      ['PRI_CBMS_FOCUS_CH_EVER', 10],
      ['PRI_CBMS_FOCUS_CP_NOW', 10],
      ['PRI_CBMS_FOCUS_CP_1', 10],
      ['PRI_CBMS_FOCUS_CP_EVER', 10],
      ['PRI_CBMS_FOCUS_CW_NOW', 11],
      ['PRI_CBMS_FOCUS_CW_1', 10],
      ['PRI_CBMS_FOCUS_CW_EVER', 12],
      ['PRI_CBMS_FOCUS_DF_NOW', 10],
      ['PRI_CBMS_FOCUS_DF_1', 10],
      ['PRI_CBMS_FOCUS_DF_EVER', 12],
      ['PRI_CBMS_FOCUS_EX_NOW', 11],
      ['PRI_CBMS_FOCUS_EX_1', 9],
      ['PRI_CBMS_FOCUS_EX_EVER', 10],
      ['PRI_CBMS_FOCUS_FM_NOW', 10],
      ['PRI_CBMS_FOCUS_FM_1', 10],
      ['PRI_CBMS_FOCUS_FM_EVER', 10],
      ['PRI_CBMS_FOCUS_FP_NOW', 10],
      ['PRI_CBMS_FOCUS_FP_1', 10],
      ['PRI_CBMS_FOCUS_FP_EVER', 12],
      ['PRI_CBMS_FOCUS_FS_NOW', 10],
      ['PRI_CBMS_FOCUS_FS_1', 10],
      ['PRI_CBMS_FOCUS_FS_EVER', 9],
      ['PRI_CBMS_FOCUS_FT_NOW', 10],
      ['PRI_CBMS_FOCUS_FT_1', 10],
      ['PRI_CBMS_FOCUS_FT_EVER', 10],
      ['PRI_CBMS_FOCUS_LS_NOW', 10],
      ['PRI_CBMS_FOCUS_LS_1', 10],
      ['PRI_CBMS_FOCUS_LS_EVER', 10],
      ['PRI_CBMS_FOCUS_LT_NOW', 10],
      ['PRI_CBMS_FOCUS_LT_1', 10],
      ['PRI_CBMS_FOCUS_LT_EVER', 3],
      ['PRI_CBMS_FOCUS_MA_NOW', 10],
      ['PRI_CBMS_FOCUS_MA_1', 8],
      ['PRI_CBMS_FOCUS_MA_EVER', 9],
      ['PRI_CBMS_FOCUS_MS_NOW', 10],
      ['PRI_CBMS_FOCUS_MS_1', 10],
      ['PRI_CBMS_FOCUS_MS_EVER', 10],
      ['PRI_CBMS_FOCUS_NM_NOW', 10],
      ['PRI_CBMS_FOCUS_NM_1', 10],
      ['PRI_CBMS_FOCUS_NM_EVER', 10],
      ['PRI_CBMS_FOCUS_PE_NOW', 10],
      ['PRI_CBMS_FOCUS_PE_1', 10],
      ['PRI_CBMS_FOCUS_PE_EVER', 10],
      ['PRI_CBMS_FOCUS_WW_NOW', 10],
      ['PRI_CBMS_FOCUS_WW_1', 10],
      ['PRI_CBMS_FOCUS_WW_EVER', 10],
      ['PRI_CBMS_FOCUS_CD_DENY', 9],
      ['PRI_CBMS_FOCUS_CH_DENY', 9],
      ['PRI_CBMS_FOCUS_CP_DENY', 10],
      ['PRI_CBMS_FOCUS_CW_DENY', 10],
      ['PRI_CBMS_FOCUS_DF_DENY', 9],
      ['PRI_CBMS_FOCUS_EX_DENY', 10],
      ['PRI_CBMS_FOCUS_FM_DENY', 10],
      ['PRI_CBMS_FOCUS_FP_DENY', 10],
      ['PRI_CBMS_FOCUS_FS_DENY', 10],
      ['PRI_CBMS_FOCUS_FT_DENY', 10],
      ['PRI_CBMS_FOCUS_LS_DENY', 10],
      ['PRI_CBMS_FOCUS_LT_DENY', 10],
      ['PRI_CBMS_FOCUS_MA_DENY', 10],
      ['PRI_CBMS_FOCUS_MS_DENY', 10],
      ['PRI_CBMS_FOCUS_NM_DENY', 10],
      ['PRI_CBMS_FOCUS_PE_DENY', 9],
      ['PRI_CBMS_FOCUS_WW_DENY', 10],
      ['PRI_CBMS_ADULT_AF_NOW', 10],
      ['PRI_CBMS_ADULT_AF_1', 10],
      ['PRI_CBMS_ADULT_AF_EVER', 10],
      ['PRI_CBMS_ADULT_AM_NOW', 10],
      ['PRI_CBMS_ADULT_AM_1', 10],
      ['PRI_CBMS_ADULT_AM_EVER', 10],
      ['PRI_CBMS_ADULT_AP_NOW', 10],
      ['PRI_CBMS_ADULT_AP_1', 10],
      ['PRI_CBMS_ADULT_AP_EVER', 10],
      ['PRI_CBMS_ADULT_CD_NOW', 10],
      ['PRI_CBMS_ADULT_CD_1', 10],
      ['PRI_CBMS_ADULT_CD_EVER', 10],
      ['PRI_CBMS_ADULT_CH_NOW', 10],
      ['PRI_CBMS_ADULT_CH_1', 10],
      ['PRI_CBMS_ADULT_CH_EVER', 10],
      ['PRI_CBMS_ADULT_CP_NOW', 10],
      ['PRI_CBMS_ADULT_CP_1', 10],
      ['PRI_CBMS_ADULT_CP_EVER', 10],
      ['PRI_CBMS_ADULT_CW_NOW', 10],
      ['PRI_CBMS_ADULT_CW_1', 10],
      ['PRI_CBMS_ADULT_CW_EVER', 10],
      ['PRI_CBMS_ADULT_DF_NOW', 10],
      ['PRI_CBMS_ADULT_DF_1', 10],
      ['PRI_CBMS_ADULT_DF_EVER', 10],
      ['PRI_CBMS_ADULT_EX_NOW', 10],
      ['PRI_CBMS_ADULT_EX_1', 10],
      ['PRI_CBMS_ADULT_EX_EVER', 10],
      ['PRI_CBMS_ADULT_FM_NOW', 10],
      ['PRI_CBMS_ADULT_FM_1', 10],
      ['PRI_CBMS_ADULT_FM_EVER', 10],
      ['PRI_CBMS_ADULT_FP_NOW', 10],
      ['PRI_CBMS_ADULT_FP_1', 10],
      ['PRI_CBMS_ADULT_FP_EVER', 10],
      ['PRI_CBMS_ADULT_FS_NOW', 10],
      ['PRI_CBMS_ADULT_FS_1', 10],
      ['PRI_CBMS_ADULT_FS_EVER', 10],
      ['PRI_CBMS_ADULT_FT_NOW', 10],
      ['PRI_CBMS_ADULT_FT_1', 10],
      ['PRI_CBMS_ADULT_FT_EVER', 10],
      ['PRI_CBMS_ADULT_LS_NOW', 10],
      ['PRI_CBMS_ADULT_LS_1', 10],
      ['PRI_CBMS_ADULT_LS_EVER', 10],
      ['PRI_CBMS_ADULT_LT_NOW', 10],
      ['PRI_CBMS_ADULT_LT_1', 10],
      ['PRI_CBMS_ADULT_LT_EVER', 10],
      ['PRI_CBMS_ADULT_MA_NOW', 10],
      ['PRI_CBMS_ADULT_MA_1', 10],
      ['PRI_CBMS_ADULT_MA_EVER', 10],
      ['PRI_CBMS_ADULT_MS_NOW', 10],
      ['PRI_CBMS_ADULT_MS_1', 10],
      ['PRI_CBMS_ADULT_MS_EVER', 10],
      ['PRI_CBMS_ADULT_NM_NOW', 10],
      ['PRI_CBMS_ADULT_NM_1', 10],
      ['PRI_CBMS_ADULT_NM_EVER', 10],
      ['PRI_CBMS_ADULT_PE_NOW', 10],
      ['PRI_CBMS_ADULT_PE_1', 10],
      ['PRI_CBMS_ADULT_PE_EVER', 10],
      ['PRI_CBMS_ADULT_WW_NOW', 10],
      ['PRI_CBMS_ADULT_WW_1', 10],
      ['PRI_CBMS_ADULT_WW_EVER', 10],
    ],
    filterCriteria: '',
    sortContribDir: 'asc',
    filterValue: 'all',
    modelPredFilterValue: 'all',
    diffFilterVal: 'difference',
    filterCategs: null,
    contribFilters: 'all',
    sortPredDirection: null,
    sortDiffDirection: null,
    featureImpSortDir: 'asc',
    featureTypeFilters: {
      positiveFeatures: 'all',
      negativeFeatures: 'all',
    },
    featureTypeSortDir: {
      positiveFeatures: 'asc',
      negativeFeatures: 'desc',
    },
    featureTypeFilterCategs: {
      positiveFeatures: null,
      negativeFeatures: null,
    },
  },
};
