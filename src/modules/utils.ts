import Meet from "./Meet/api";

export default class Utils {
  constructor() {
  }
  public getRGB(color: string) {
    var sColor = color.toLowerCase();
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (var i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (var i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return sColorChange;
    }
    return sColor;
  }

  /**
   * @deprecated
   * @param queryText 
   * @returns 
   */
  public async getRelatedText(queryText: string) {
    return await Meet.Zotero.getRelatedText(queryText)
  }
}
