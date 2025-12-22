export interface OnCityCreateBrandResponseDto {
  Id: number;
  Name: string;
  Text: string;
  Keywords: string;
  SiteTitle: string;
  Active: boolean;
  MenuHome: boolean;
  AdWordsRemarketingCode?: string;
  LomadeeCampaignCode?: string;
  Score?: number | null;
  LinkId: string;
}
