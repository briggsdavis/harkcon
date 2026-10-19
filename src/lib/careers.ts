export const careersPortalUrl =
  "https://workforcenow.adp.com/mascsr/default/mdf/recruitment/recruitment.html?cid=15aa7385-7aee-410b-90e3-5972b600f083&ccId=19000101_000001&type=JS&lang=en_US&selectedMenuKey=CurrentOpenings"
export const talentCommunityUrl = careersPortalUrl.replace("CurrentOpenings", "CareerCenter")
export type CareerOpening = {
  id: string
  title: string
  location: string
  employmentType: string
  applyUrl: string
}
