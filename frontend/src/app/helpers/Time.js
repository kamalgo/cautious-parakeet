import moment from "moment";

export function convertToIst(time) {
  // reference format - YYYY-MM-DD HH:mm:ss
  return moment(time.updatedAt).utcOffset("+05:30").format("MMM DD YYYY");
}
