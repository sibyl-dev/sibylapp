import defaultState from './states/entities.default';
import {
  currentEntityID,
  currentUserID,
  getActivePredictionScore,
  getCurrentEntityData,
  getCurrentEntityID,
  getCurrentModels,
  getCurrentOutcomeData,
  getCurrentUserID,
  getEntityContributions,
  getEntityDistributions,
  getEntityScore,
  getIsEntitiesLoading,
  getIsEntityDistributionsLoading,
  getIsEntityScoreLoading,
  getIsModelsLoading,
  getIsOutcomeDataLoading,
  getPredictionScore,
  getSelectedModelID,
} from '../../model/selectors/entities';

describe('Simple Entities Selectors', () => {
  describe('getIsEntitiesLoading()', () => {
    it('returns the entities loading state', () => {
      expect(getIsEntitiesLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentEntityData()', () => {
    it('return the entity data object', () => {
      expect(getCurrentEntityData(defaultState)).toEqual({
        eid: '0',
        features: {
          PRI_FOCUS_AGE_AT_REFERRAL: 0,
          PRI_FOCUS_PLSM_PAST180_COUNT: 0,
          PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
          PRI_FOCUS_PLSM_PAST180_LOS: 0,
          PRI_FOCUS_PLSM_PAST365_COUNT: 0,
          PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
          PRI_FOCUS_PLSM_PAST365_LOS: 0,
          PRI_FOCUS_PLSM_PAST730_COUNT: 0,
          PRI_FOCUS_PLSM_PAST730_DUMMY: 0,
          PRI_FOCUS_PLSM_PAST730_LOS: 0,
          PRI_FOCUS_PLSM_PAST90_COUNT: 0,
          PRI_FOCUS_PLSM_PAST90_DUMMY: 0,
          PRI_FOCUS_PLSM_PAST90_LOS: 0,
        },
        property: { case_ids: ['102'] },
      });
    });
  });

  describe('getIsEntityContribLoading()', () => {
    it('returns the entity contributions loading state', () => {
      expect(getIsEntitiesLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityContributions()', () => {
    it('returns the entity contributions', () => {
      expect(getEntityContributions(defaultState)).toEqual({
        PRI_CBMS_FOCUS_CD_NOW: 0,
        PRI_CBMS_FOCUS_CD_1: 0,
        PRI_CBMS_FOCUS_CD_EVER: 0,
        PRI_CBMS_FOCUS_CH_NOW: 0.01381710798,
        PRI_CBMS_FOCUS_CH_1: 2.9640000000000004e-15,
        PRI_CBMS_FOCUS_CH_EVER: 0.000009639,
        PRI_CBMS_FOCUS_CP_NOW: 0,
        PRI_CBMS_FOCUS_CP_1: 0,
        PRI_CBMS_FOCUS_CP_EVER: 0,
        PRI_CBMS_FOCUS_CW_NOW: -0.0457222928,
        PRI_CBMS_FOCUS_CW_1: 0,
        PRI_CBMS_FOCUS_CW_EVER: -0.10778320013999998,
        PRI_CBMS_FOCUS_DF_NOW: 0,
        PRI_CBMS_FOCUS_DF_1: 0,
        PRI_CBMS_FOCUS_DF_EVER: 0,
        PRI_CBMS_FOCUS_EX_NOW: -0.006810542819999999,
        PRI_CBMS_FOCUS_EX_1: 0.06830713406,
        PRI_CBMS_FOCUS_EX_EVER: 0,
        PRI_CBMS_FOCUS_FM_NOW: 0,
        PRI_CBMS_FOCUS_FM_1: 0,
        PRI_CBMS_FOCUS_FM_EVER: 0,
        PRI_CBMS_FOCUS_FP_NOW: 0,
        PRI_CBMS_FOCUS_FP_1: 0,
        PRI_CBMS_FOCUS_FP_EVER: -0.023118739440000004,
        PRI_CBMS_FOCUS_FS_NOW: 0,
        PRI_CBMS_FOCUS_FS_1: 0,
        PRI_CBMS_FOCUS_FS_EVER: 0.012992110320000003,
        PRI_CBMS_FOCUS_FT_NOW: 0,
        PRI_CBMS_FOCUS_FT_1: 0,
        PRI_CBMS_FOCUS_FT_EVER: 0,
        PRI_CBMS_FOCUS_LS_NOW: 0,
        PRI_CBMS_FOCUS_LS_1: 0,
        PRI_CBMS_FOCUS_LS_EVER: 0,
        PRI_CBMS_FOCUS_LT_NOW: 0,
        PRI_CBMS_FOCUS_LT_1: 0,
        PRI_CBMS_FOCUS_LT_EVER: 0,
        PRI_CBMS_FOCUS_MA_NOW: 0,
        PRI_CBMS_FOCUS_MA_1: 0.0650129705,
        PRI_CBMS_FOCUS_MA_EVER: 0.03168967848,
        PRI_CBMS_FOCUS_MS_NOW: 0,
        PRI_CBMS_FOCUS_MS_1: 0,
        PRI_CBMS_FOCUS_MS_EVER: 0,
        PRI_CBMS_FOCUS_NM_NOW: 0,
        PRI_CBMS_FOCUS_NM_1: 0,
        PRI_CBMS_FOCUS_NM_EVER: 0,
        PRI_CBMS_FOCUS_PE_NOW: 0,
        PRI_CBMS_FOCUS_PE_1: 0,
        PRI_CBMS_FOCUS_PE_EVER: 0,
        PRI_CBMS_FOCUS_WW_NOW: 0,
        PRI_CBMS_FOCUS_WW_1: 0,
        PRI_CBMS_FOCUS_WW_EVER: 0,
        PRI_CBMS_FOCUS_CD_DENY: 0.01319088075,
        PRI_CBMS_FOCUS_CH_DENY: 0.05608855837999999,
        PRI_CBMS_FOCUS_CP_DENY: 0,
        PRI_CBMS_FOCUS_CW_DENY: -0.02256483009,
        PRI_CBMS_FOCUS_DF_DENY: 0,
        PRI_CBMS_FOCUS_EX_DENY: -0.0245032832,
        PRI_CBMS_FOCUS_FM_DENY: 0,
        PRI_CBMS_FOCUS_FP_DENY: -0.00054352683,
        PRI_CBMS_FOCUS_FS_DENY: -0.03777526816,
        PRI_CBMS_FOCUS_FT_DENY: 0,
        PRI_CBMS_FOCUS_LS_DENY: 0,
        PRI_CBMS_FOCUS_LT_DENY: 0,
        PRI_CBMS_FOCUS_MA_DENY: -0.029370019560000002,
        PRI_CBMS_FOCUS_MS_DENY: -0.000364542,
        PRI_CBMS_FOCUS_NM_DENY: 0,
        PRI_CBMS_FOCUS_PE_DENY: 0,
        PRI_CBMS_FOCUS_WW_DENY: 0,
        PRI_CBMS_OTHC_CD_NOW_COUNT: 0,
        PRI_CBMS_OTHC_CD_1_COUNT: 0,
        PRI_CBMS_OTHC_CD_EVER_COUNT: 0.004429313769999999,
        PRI_CBMS_OTHC_CH_NOW_COUNT: 0,
        PRI_CBMS_OTHC_CH_1_COUNT: 0,
        PRI_CBMS_OTHC_CH_EVER_COUNT: 0.01869052878,
        PRI_CBMS_OTHC_CP_NOW_COUNT: 0,
        PRI_CBMS_OTHC_CP_1_COUNT: 0,
        PRI_CBMS_OTHC_CP_EVER_COUNT: 0,
        PRI_CBMS_OTHC_CW_NOW_COUNT: 0,
        PRI_CBMS_OTHC_CW_1_COUNT: -0.10411862813000002,
        PRI_CBMS_OTHC_CW_EVER_COUNT: 0,
        PRI_CBMS_OTHC_DF_NOW_COUNT: 0,
        PRI_CBMS_OTHC_DF_1_COUNT: 0,
        PRI_CBMS_OTHC_DF_EVER_COUNT: 0,
        PRI_CBMS_OTHC_EX_NOW_COUNT: 0,
        PRI_CBMS_OTHC_EX_1_COUNT: -0.01485873491,
        PRI_CBMS_OTHC_EX_EVER_COUNT: 0,
        PRI_CBMS_OTHC_FM_NOW_COUNT: 0,
        PRI_CBMS_OTHC_FM_1_COUNT: 0,
        PRI_CBMS_OTHC_FM_EVER_COUNT: 0,
        PRI_CBMS_OTHC_FP_NOW_COUNT: -0.00117019,
        PRI_CBMS_OTHC_FP_1_COUNT: 0,
        PRI_CBMS_OTHC_FP_EVER_COUNT: 0.00485763,
        PRI_CBMS_OTHC_FS_NOW_COUNT: 0,
        PRI_CBMS_OTHC_FS_1_COUNT: 0,
        PRI_CBMS_OTHC_FS_EVER_COUNT: 0,
        PRI_CBMS_OTHC_FT_NOW_COUNT: 0,
        PRI_CBMS_OTHC_FT_1_COUNT: 0,
        PRI_CBMS_OTHC_FT_EVER_COUNT: 0,
        PRI_CBMS_OTHC_LS_NOW_COUNT: 0,
        PRI_CBMS_OTHC_LS_1_COUNT: 0,
        PRI_CBMS_OTHC_LS_EVER_COUNT: 0,
        PRI_CBMS_OTHC_LT_NOW_COUNT: 0,
        PRI_CBMS_OTHC_LT_1_COUNT: 0,
        PRI_CBMS_OTHC_LT_EVER_COUNT: 0,
        PRI_CBMS_OTHC_MA_NOW_COUNT: 0,
        PRI_CBMS_OTHC_MA_1_COUNT: 0,
        PRI_CBMS_OTHC_MA_EVER_COUNT: 0,
        PRI_CBMS_OTHC_MS_NOW_COUNT: 0,
        PRI_CBMS_OTHC_MS_1_COUNT: 0,
        PRI_CBMS_OTHC_MS_EVER_COUNT: 0,
        PRI_CBMS_OTHC_NM_NOW_COUNT: 0,
        PRI_CBMS_OTHC_NM_1_COUNT: 0,
        PRI_CBMS_OTHC_NM_EVER_COUNT: 0,
        PRI_CBMS_OTHC_PE_NOW_COUNT: 0,
        PRI_CBMS_OTHC_PE_1_COUNT: 0,
        PRI_CBMS_OTHC_PE_EVER_COUNT: 0,
        PRI_CBMS_OTHC_WW_NOW_COUNT: 0,
        PRI_CBMS_OTHC_WW_1_COUNT: 0,
        PRI_CBMS_OTHC_WW_EVER_COUNT: 0,
        PRI_CBMS_OTHC_CD_DENY_COUNT: 0.0005150381,
        PRI_CBMS_OTHC_CH_DENY_COUNT: 0.05873673515999999,
        PRI_CBMS_OTHC_CP_DENY_COUNT: 0,
        PRI_CBMS_OTHC_CW_DENY_COUNT: 0,
        PRI_CBMS_OTHC_DF_DENY_COUNT: 0,
        PRI_CBMS_OTHC_EX_DENY_COUNT: 0,
        PRI_CBMS_OTHC_FM_DENY_COUNT: 0,
        PRI_CBMS_OTHC_FP_DENY_COUNT: 0,
        PRI_CBMS_OTHC_FS_DENY_COUNT: 0,
        PRI_CBMS_OTHC_FT_DENY_COUNT: 0,
        PRI_CBMS_OTHC_LS_DENY_COUNT: 0,
        PRI_CBMS_OTHC_LT_DENY_COUNT: 0,
        PRI_CBMS_OTHC_MA_DENY_COUNT: -0.03796416942,
        PRI_CBMS_OTHC_MS_DENY_COUNT: 0,
        PRI_CBMS_OTHC_NM_DENY_COUNT: 0,
        PRI_CBMS_OTHC_PE_DENY_COUNT: 0.00166334099,
        PRI_CBMS_OTHC_WW_DENY_COUNT: 0,
        PRI_CBMS_ADULT_AF_NOW: 0,
        PRI_CBMS_ADULT_AF_1: 0,
        PRI_CBMS_ADULT_AF_EVER: 0,
        PRI_CBMS_ADULT_AM_NOW: 0,
        PRI_CBMS_ADULT_AM_1: 0,
        PRI_CBMS_ADULT_AM_EVER: 0,
        PRI_CBMS_ADULT_AP_NOW: 0,
        PRI_CBMS_ADULT_AP_1: 0,
        PRI_CBMS_ADULT_AP_EVER: 0,
        PRI_CBMS_ADULT_CD_NOW: 0,
        PRI_CBMS_ADULT_CD_1: 0,
        PRI_CBMS_ADULT_CD_EVER: 0,
        PRI_CBMS_ADULT_CH_NOW: 0,
        PRI_CBMS_ADULT_CH_1: 0,
        PRI_CBMS_ADULT_CH_EVER: 0,
        PRI_CBMS_ADULT_CP_NOW: 0,
        PRI_CBMS_ADULT_CP_1: 0,
        PRI_CBMS_ADULT_CP_EVER: 0,
        PRI_CBMS_ADULT_CW_NOW: 0,
        PRI_CBMS_ADULT_CW_1: 0,
        PRI_CBMS_ADULT_CW_EVER: 0,
        PRI_CBMS_ADULT_DF_NOW: 0,
        PRI_CBMS_ADULT_DF_1: 0,
        PRI_CBMS_ADULT_DF_EVER: 0,
        PRI_CBMS_ADULT_EX_NOW: 0,
        PRI_CBMS_ADULT_EX_1: 0,
        PRI_CBMS_ADULT_EX_EVER: 0,
        PRI_CBMS_ADULT_FM_NOW: 0,
        PRI_CBMS_ADULT_FM_1: 0,
        PRI_CBMS_ADULT_FM_EVER: 0,
        PRI_CBMS_ADULT_FP_NOW: 0,
        PRI_CBMS_ADULT_FP_1: 0,
        PRI_CBMS_ADULT_FP_EVER: 0,
        PRI_CBMS_ADULT_FS_NOW: 0,
        PRI_CBMS_ADULT_FS_1: 0,
        PRI_CBMS_ADULT_FS_EVER: 0,
        PRI_CBMS_ADULT_FT_NOW: 0,
        PRI_CBMS_ADULT_FT_1: 0,
        PRI_CBMS_ADULT_FT_EVER: 0,
        PRI_CBMS_ADULT_LS_NOW: 0,
        PRI_CBMS_ADULT_LS_1: 0,
        PRI_CBMS_ADULT_LS_EVER: 0,
        PRI_CBMS_ADULT_LT_NOW: 0,
        PRI_CBMS_ADULT_LT_1: 0,
        PRI_CBMS_ADULT_LT_EVER: 0,
        PRI_CBMS_ADULT_MA_NOW: 0,
        PRI_CBMS_ADULT_MA_1: 0,
        PRI_CBMS_ADULT_MA_EVER: 0,
        PRI_CBMS_ADULT_MS_NOW: 0,
        PRI_CBMS_ADULT_MS_1: 0,
        PRI_CBMS_ADULT_MS_EVER: 0,
        PRI_CBMS_ADULT_NM_NOW: 0,
        PRI_CBMS_ADULT_NM_1: 0,
        PRI_CBMS_ADULT_NM_EVER: 0,
        PRI_CBMS_ADULT_PE_NOW: 0,
        PRI_CBMS_ADULT_PE_1: 0,
        PRI_CBMS_ADULT_PE_EVER: 0,
        PRI_CBMS_ADULT_WW_NOW: 0,
        PRI_CBMS_ADULT_WW_1: 0,
        PRI_CBMS_ADULT_WW_EVER: 0,
        PRI_CBMS_ADULT_AF_DENY_COUNT: 0,
        PRI_CBMS_ADULT_AM_DENY_COUNT: 0,
        PRI_CBMS_ADULT_AP_DENY_COUNT: 0,
        PRI_CBMS_ADULT_CD_DENY_COUNT: 0,
        PRI_CBMS_ADULT_CH_DENY_COUNT: 0,
        PRI_CBMS_ADULT_CP_DENY_COUNT: 0,
        PRI_CBMS_ADULT_CW_DENY_COUNT: 0,
        PRI_CBMS_ADULT_DF_DENY_COUNT: 0,
        PRI_CBMS_ADULT_EX_DENY_COUNT: 0,
        PRI_CBMS_ADULT_FM_DENY_COUNT: 0,
        PRI_CBMS_ADULT_FP_DENY_COUNT: 0,
        PRI_CBMS_ADULT_FS_DENY_COUNT: 0,
        PRI_CBMS_ADULT_FT_DENY_COUNT: 0,
        PRI_CBMS_ADULT_LS_DENY_COUNT: 0,
        PRI_CBMS_ADULT_LT_DENY_COUNT: 0,
        PRI_CBMS_ADULT_MA_DENY_COUNT: 0,
        PRI_CBMS_ADULT_MS_DENY_COUNT: 0,
        PRI_CBMS_ADULT_NM_DENY_COUNT: 0,
        PRI_CBMS_ADULT_PE_DENY_COUNT: 0,
        PRI_CBMS_ADULT_WW_DENY_COUNT: 0,
        PRI_CBMS_ADULT_SANC_COUNT: 0,
        PRI_CBMS_ADULT_DVRS_COUNT: 0,
        PRI_FOCUS_AGE_AT_REFERRAL: 0.17030227689000002,
        PRI_FOCUS_PLSM_PAST90_DUMMY: 0.0021496224,
        PRI_FOCUS_PLSM_PAST180_DUMMY: 0,
        PRI_FOCUS_PLSM_PAST365_DUMMY: 0,
        PRI_FOCUS_PLSM_PAST730_DUMMY: -0.0161774817,
        PRI_FOCUS_PLSM_PAST90_LOS: 0.013295068850000001,
        PRI_FOCUS_PLSM_PAST90_COUNT: 0.00177941188,
        PRI_FOCUS_PLSM_PAST180_LOS: 0,
        PRI_FOCUS_PLSM_PAST180_COUNT: -0.00272553132,
        PRI_FOCUS_PLSM_PAST365_LOS: 0,
        PRI_FOCUS_PLSM_PAST365_COUNT: -0.0017823015000000002,
        PRI_FOCUS_PLSM_PAST730_LOS: 0,
        PRI_FOCUS_PLSM_PAST730_COUNT: -0.0043466519999999995,
        PRI_FOCUS_PLSM_EVER: -0.029091358800000005,
        PRI_FOCUS_REFSCI_PAST90_COUNT: -0.00074769856,
        PRI_FOCUS_REFSCI_PAST180_COUNT: 0,
        PRI_FOCUS_REFSCI_PAST365_COUNT: -0.08907336099999999,
        PRI_FOCUS_REFSCI_PAST730_COUNT: -0.05318989026,
        PRI_FOCUS_REFSCI_EVER_COUNT: -0.02158022399,
        PRI_FOCUS_REFSCO_PAST90_COUNT: -0.026854444090000002,
        PRI_FOCUS_REFSCO_PAST180_COUNT: -0.01238070555,
        PRI_FOCUS_REFSCO_PAST365_COUNT: -0.023072276250000003,
        PRI_FOCUS_REFSCO_PAST730_COUNT: -0.0025456165399999993,
        PRI_FOCUS_REFSCO_EVER_COUNT: 0,
        PRI_FOCUS_FNDG_PAST90_COUNT: -0.01135036386,
        PRI_FOCUS_FNDG_PAST180_COUNT: 0,
        PRI_FOCUS_FNDG_PAST365_COUNT: 0.00031018523000000004,
        PRI_FOCUS_FNDG_PAST730_COUNT: -0.00432855288,
        PRI_FOCUS_FNDG_EVER_COUNT: -0.011410944299999998,
        PRI_FOCUS_REF_NEGLECT_COUNT: 0,
        PRI_FOCUS_REF_EMOTIONAL_COUNT: 0,
        PRI_FOCUS_REF_PHYSICAL_COUNT: 0,
        PRI_FOCUS_REF_DRUG_COUNT: 0,
        PRI_FOCUS_REF_SEXUAL_COUNT: 0.03253945875,
        PRI_FOCUS_REF_OTHER_COUNT: -0.00916004782,
        PRI_FOCUS_REF_DOMESTIC_VIOLENCE_COUNT: -0.005003162320000001,
        PRI_FOCUS_DAYS_FROM_LASTRFRL: 0.0369322408,
        PRI_FOCUS_CYF_ACTIVE: -0.00633111642,
        PRI_FOCUS_JUVENILE_JUSTICE: -0.034571991200000006,
        PRI_FOCUS_COURT_ACTIVE: 0.0773938385,
        PRI_PRNT_AGE_MISS_COUNT: 0.0299331545,
        PRI_PRNT_AGE_12_COUNT: 0,
        PRI_PRNT_AGE_1319_COUNT: 0,
        PRI_PRNT_AGE_2024_COUNT: -0.21520170719999998,
        PRI_PRNT_AGE_2534_COUNT: -0.02672273772,
        PRI_PRNT_AGE_3544_COUNT: 0,
        PRI_PRNT_AGE_4554_COUNT: 0,
        PRI_PRNT_AGE_5564_COUNT: -0.00030488636999999997,
        PRI_PRNT_AGE_65_COUNT: -0.00346015718,
        PRI_PRNT_FEMALE_COUNT: -0.09781191875999999,
        PRI_PRNT_DAYS_FROM_LASTRFRL: -0.040720776,
        PRI_PRNT_REF_AS_CHILD: 0,
        PRI_PRNT_PLSM_AS_CHILD: 0,
        PRI_PRNT_PLSM_EVER_COUNT: -0.00957332388,
        PRI_PRNT_REFSCO_PAST90_COUNT: 0,
        PRI_PRNT_REFSCO_PAST180_COUNT: 0,
        PRI_PRNT_REFSCO_PAST365_COUNT: 0,
        PRI_PRNT_REFSCO_PAST730_COUNT: 0,
        PRI_PRNT_REFSCO_EVER_COUNT: 0,
        PRI_PRNT_REFSCI_PAST90_COUNT: 0,
        PRI_PRNT_REFSCI_PAST180_COUNT: 0,
        PRI_PRNT_REFSCI_PAST365_COUNT: 0,
        PRI_PRNT_REFSCI_PAST730_COUNT: 0,
        PRI_PRNT_REFSCI_EVER_COUNT: 0,
        PRI_PRNT_REF_NEGLECT_COUNT: 0.008314685609999999,
        PRI_PRNT_REF_EMOTIONAL_COUNT: -0.11037862608,
        PRI_PRNT_REF_PHYSICAL_COUNT: 0,
        PRI_PRNT_REF_DRUG_COUNT: 0,
        PRI_PRNT_REF_SEXUAL_COUNT: -0.02529072468,
        PRI_PRNT_REF_OTHER_COUNT: -0.0034991814,
        PRI_PRNT_REF_DOMESTIC_VIOLENCE_COUNT: 0,
        PRI_PRNT_FNDG_PAST90_COUNT: -0.0015464736899999999,
        PRI_PRNT_FNDG_PAST180_COUNT: -0.0032893122999999996,
        PRI_PRNT_FNDG_PAST365_COUNT: 0,
        PRI_PRNT_FNDG_PAST730_COUNT: -0.01248163455,
        PRI_PRNT_FNDG_EVER_COUNT: -0.005648449840000001,
        PRI_PRNT_CYF_ACTIVE: -0.0070766125,
        PRI_PRNT_JUVENILE_JUSTICE: -0.0175770616,
        PRI_PRNT_COURT_ACTIVE: 0.05045910584,
        PRI_PERP_AGE_MISS_COUNT: 0.00432711855,
        PRI_PERP_AGE_12_COUNT: 0,
        PRI_PERP_AGE_1319_COUNT: 0.00329454356,
        PRI_PERP_AGE_2024_COUNT: 0.00022640865,
        PRI_PERP_AGE_2534_COUNT: -0.02310044226,
        PRI_PERP_AGE_3544_COUNT: 0,
        PRI_PERP_AGE_4554_COUNT: 0.0066337406,
        PRI_PERP_AGE_5564_COUNT: 0.00240462305,
        PRI_PERP_AGE_65_COUNT: 0,
        PRI_PERP_FEMALE_COUNT: -0.1188990112,
        PRI_PERP_DAYS_FROM_LASTRFRL: 0.00357043,
        PRI_PERP_REF_AS_CHILD: 0,
        PRI_PERP_PLSM_AS_CHILD: 0,
        PRI_PERP_PLSM_EVER_COUNT: -0.0246448353,
        PRI_PERP_REFSCO_PAST90_COUNT: 0,
        PRI_PERP_REFSCO_PAST180_COUNT: 0,
        PRI_PERP_REFSCO_PAST365_COUNT: 0,
        PRI_PERP_REFSCO_PAST730_COUNT: 0,
        PRI_PERP_REFSCO_EVER_COUNT: 0,
        PRI_PERP_REFSCI_PAST90_COUNT: 0,
        PRI_PERP_REFSCI_PAST180_COUNT: 0,
        PRI_PERP_REFSCI_PAST365_COUNT: 0,
        PRI_PERP_REFSCI_PAST730_COUNT: 0,
        PRI_PERP_REFSCI_EVER_COUNT: -0.00570174,
        PRI_PERP_REF_NEGLECT_COUNT: -0.040770103079999995,
        PRI_PERP_REF_EMOTIONAL_COUNT: 0,
        PRI_PERP_REF_PHYSICAL_COUNT: 0.0376730755,
        PRI_PERP_REF_DRUG_COUNT: 0,
        PRI_PERP_REF_SEXUAL_COUNT: 0,
        PRI_PERP_REF_OTHER_COUNT: 0.0010629530399999998,
        PRI_PERP_REF_DOMESTIC_VIOLENCE_COUNT: 0,
        PRI_PERP_FNDG_PAST90_COUNT: -0.011242880240000001,
        PRI_PERP_FNDG_PAST180_COUNT: 0,
        PRI_PERP_FNDG_PAST365_COUNT: 0,
        PRI_PERP_FNDG_PAST730_COUNT: -0.014253347710000001,
        PRI_PERP_FNDG_EVER_COUNT: 0,
        PRI_PERP_CYF_ACTIVE: -0.0028286664,
        PRI_PERP_JUVENILE_JUSTICE: -0.00217908192,
        PRI_PERP_COURT_ACTIVE: -0.0037019648800000002,
        PRI_OTHC_AGE_MISS_COUNT: 0,
        PRI_OTHC_AGE_ADULT_COUNT: 0.00880331627,
        PRI_OTHC_AGE_INF_COUNT: -0.00876570328,
        PRI_OTHC_AGE_TOD_COUNT: -0.013197573000000002,
        PRI_OTHC_AGE_PRE_COUNT: -0.0056556428,
        PRI_OTHC_AGE_SC1_COUNT: 0.04884189702,
        PRI_OTHC_AGE_SC2_COUNT: 0.041020031,
        PRI_OTHC_AGE_TEEN_COUNT: 0.04972137509999999,
        PRI_OTHC_GENDER_MISS_COUNT: -0.0033821689100000003,
        PRI_OTHC_FEMALE_COUNT: 0.05667425407999999,
        PRI_OTHC_PLSM_PAST90_DUMMY: 0.00506480325,
        PRI_OTHC_PLSM_PAST180_DUMMY: 0,
        PRI_OTHC_PLSM_PAST365_DUMMY: 0,
        PRI_OTHC_PLSM_PAST730_DUMMY: 0,
        PRI_OTHC_PLSM_PAST90_COUNT: 0,
        PRI_OTHC_PLSM_PAST180_COUNT: 0,
        PRI_OTHC_PLSM_PAST365_COUNT: 0,
        PRI_OTHC_PLSM_PAST730_COUNT: -0.0009267626,
        PRI_OTHC_PLSM_PAST90_LOS: 0.00944795871,
        PRI_OTHC_PLSM_PAST180_LOS: 0,
        PRI_OTHC_PLSM_PAST365_LOS: 0,
        PRI_OTHC_PLSM_PAST730_LOS: 0,
        PRI_OTHC_PLSM_EVER_COUNT: 0.00230071347,
        PRI_OTHC_REFSCO_PAST90_COUNT: 0,
        PRI_OTHC_REFSCO_PAST180_COUNT: 0,
        PRI_OTHC_REFSCO_PAST365_COUNT: 0,
        PRI_OTHC_REFSCO_PAST730_COUNT: 0,
        PRI_OTHC_REFSCO_EVER_COUNT: -0.01832346225,
        PRI_OTHC_REFSCI_PAST90_COUNT: 0,
        PRI_OTHC_REFSCI_PAST180_COUNT: 0.00275184728,
        PRI_OTHC_REFSCI_PAST365_COUNT: 0,
        PRI_OTHC_REFSCI_PAST730_COUNT: 0.00934489736,
        PRI_OTHC_REFSCI_EVER_COUNT: 0,
        PRI_OTHC_FNDG_PAST90_COUNT: 0,
        PRI_OTHC_FNDG_PAST180_COUNT: 0,
        PRI_OTHC_FNDG_PAST365_COUNT: 0,
        PRI_OTHC_FNDG_PAST730_COUNT: 0,
        PRI_OTHC_FNDG_EVER_COUNT: 0.012476208820000001,
        PRI_OTHC_REF_NEGLECT_COUNT: 0,
        PRI_OTHC_REF_EMOTIONAL_COUNT: 0.0041506161599999996,
        PRI_OTHC_REF_PHYSICAL_COUNT: 0,
        PRI_OTHC_REF_DRUG_COUNT: 0,
        PRI_OTHC_REF_SEXUAL_COUNT: 0.0033250492,
        PRI_OTHC_REF_OTHER_COUNT: -0.004038577199999999,
        PRI_OTHC_REF_DOMESTIC_VIOLENCE_COUNT: -0.0160348635,
        PRI_OTHC_DAYS_FROM_LASTRFRL: 0.007133100000000001,
        PRI_OTHC_CYF_ACTIVE: -0.01142963964,
        PRI_OTHC_JUVENILE_JUSTICE: 0.00155477894,
        PRI_OTHC_COURT_ACTIVE: 0.00108255602,
        PRI_OTHA_AGE_MISS_COUNT: 0,
        PRI_OTHA_AGE_12_COUNT: 0,
        PRI_OTHA_AGE_1319_COUNT: 0,
        PRI_OTHA_AGE_2024_COUNT: 0,
        PRI_OTHA_AGE_2534_COUNT: -0.00107516068,
        PRI_OTHA_AGE_3544_COUNT: 0,
        PRI_OTHA_AGE_4554_COUNT: 0,
        PRI_OTHA_AGE_5564_COUNT: 0,
        PRI_OTHA_AGE_65_COUNT: -0.00076684615,
        PRI_OTHA_FEMALE_COUNT: -0.02986451526,
        PRI_OTHA_DAYS_FROM_LASTRFRL: 0,
        PRI_OTHA_REF_AS_CHILD: -0.00047385236,
        PRI_OTHA_PLSM_AS_CHILD: 0,
        PRI_OTHA_PLSM_EVER_COUNT: 0,
        PRI_OTHA_REFSCO_PAST90_COUNT: 0,
        PRI_OTHA_REFSCO_PAST180_COUNT: 0,
        PRI_OTHA_REFSCO_PAST365_COUNT: 0.00047418224000000004,
        PRI_OTHA_REFSCO_PAST730_COUNT: 0,
        PRI_OTHA_REFSCO_EVER_COUNT: 0.08008638336,
        PRI_OTHA_REFSCI_PAST90_COUNT: 0,
        PRI_OTHA_REFSCI_PAST180_COUNT: 0,
        PRI_OTHA_REFSCI_PAST365_COUNT: 0,
        PRI_OTHA_REFSCI_PAST730_COUNT: 0,
        PRI_OTHA_REFSCI_EVER_COUNT: 0,
        PRI_OTHA_FNDG_PAST90_COUNT: 0,
        PRI_OTHA_FNDG_PAST180_COUNT: 0,
        PRI_OTHA_FNDG_PAST365_COUNT: 0,
        PRI_OTHA_FNDG_PAST730_COUNT: 0,
        PRI_OTHA_FNDG_EVER_COUNT: 0.0015198151500000004,
        PRI_OTHA_REF_NEGLECT_COUNT: 0,
        PRI_OTHA_REF_EMOTIONAL_COUNT: 0,
        PRI_OTHA_REF_PHYSICAL_COUNT: 0.00009930835,
        PRI_OTHA_REF_DRUG_COUNT: 0,
        PRI_OTHA_REF_SEXUAL_COUNT: 0.00095783898,
        PRI_OTHA_REF_OTHER_COUNT: 0,
        PRI_OTHA_REF_DOMESTIC_VIOLENCE_COUNT: -0.00019007817000000002,
        PRI_OTHA_CYF_ACTIVE: 0,
        PRI_OTHA_JUVENILE_JUSTICE: -0.0007561059200000001,
        PRI_OTHA_COURT_ACTIVE: 0,
        PRI_FOCUS_AGE: 0.62548055307,
        PRI_FOCUS_CHILD_ROLE: 0.09448488231999999,
        PRI_FOCUS_GENDER: -0.051279765219999995,
        PRI_OTHA_COUNT: 0,
        PRI_OTHC_COUNT: 0.13089040041,
        PRI_PERP_COUNT: 0.07117446468000001,
        PRI_PRNT_COUNT: -0.34406837697,
        PRI_VICTIM_COUNT: -0.02190760099,
      });
    });
  });

  describe('getIsEntityScoreLoading()', () => {
    it('returns the entity score loading state', () => {
      expect(getIsEntityScoreLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityScore()', () => {
    it('returns the entity score', () => {
      expect(getEntityScore(defaultState)).toEqual(5.6);
    });
  });

  describe('getIsEntityDistributionsLoading()', () => {
    it('returns the entity distributions loading state', () => {
      expect(getIsEntityDistributionsLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getEntityDistributions()', () => {
    it('returns the entity distributions', () => {
      expect(getEntityDistributions(defaultState)).toEqual({});
    });
  });

  describe('getPredictionScore()', () => {
    it('returns the prediction score', () => {
      expect(getPredictionScore(defaultState)).toEqual(1.23);
    });
  });

  describe('getIsOutcomeDataLoading()', () => {
    it('returns the outcome data loading state', () => {
      expect(getIsOutcomeDataLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentOutcomeData()', () => {
    it('returns the outcome data', () => {
      expect(getCurrentOutcomeData(defaultState)).toBeNull();
    });
  });

  describe('getIsModelsLoading()', () => {
    it('returns the models loading state', () => {
      expect(getIsModelsLoading(defaultState)).toBeFalsy();
    });
  });

  describe('getCurrentModels()', () => {
    it('returns the current models', () => {
      expect(getCurrentModels(defaultState)).toEqual([
        {
          id: '1',
        },
        {
          id: '2',
        },
        {
          id: '3',
        },
      ]);
    });
  });

  describe('currentUserID()', () => {
    it('returns the user id', () => {
      expect(currentUserID(defaultState)).toEqual('testID');
    });
  });

  describe('currentEntityID()', () => {
    it('returns the user id', () => {
      expect(currentEntityID(defaultState)).toEqual('4a');
    });
  });
});

describe('Entities Created Selectors', () => {
  describe('getCurrentEntityID()', () => {
    it('returns the current entityID', () => {
      expect(getCurrentEntityID(defaultState)).toEqual('4a');
    });
    it('returns 0 because entityID is not set', () => {
      expect(getCurrentEntityID({ entities: { entityID: null } })).toEqual(0);
    });
  });
  describe('getSelectedModelID()', () => {
    it('returns the selected modelID', () => {
      expect(getSelectedModelID(defaultState)).toEqual('1');
    });
  });
  describe('getCurrentUserID()', () => {
    it('returns the currentUserID', () => {
      expect(getCurrentUserID(defaultState)).toEqual('testID');
    });
    it('returns `null` string because userID is not set', () => {
      expect(getCurrentUserID({ entities: { userID: null } })).toBeNull();
    });
  });
  describe('getActivePredictionScore()', () => {
    it('returns the prediction score', () => {
      expect(getActivePredictionScore(defaultState)).toEqual(1.23);
    });
    it('returns the entity score when prediction score is null', () => {
      const changedState = {
        entities: {
          predictionScore: null,
          entityScore: 5.6,
        },
      };

      expect(getActivePredictionScore(changedState)).toEqual(5.6);
    });
  });
});
