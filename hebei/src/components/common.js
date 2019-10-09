export const isPhone = tel => {
  const reg = /^0?1[3|4|5|6|7|8][0-9]\d{8}$/;
  return reg.test(tel);
};
export const getQuery = variable => {
  var query = window.location.search.substring(1);
  var vars = query.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == variable) {
      return pair[1];
    }
  }
  return false;
};