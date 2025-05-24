module.exports = {
  random_from_array: function (arr) {
    return arr[Math.floor(Math.random() * arr.length)];
  },
  clean_url: function (url) {
    /* Remove UTM tracking, the easy way. */
    var utmPos = url.indexOf("utm_");
    if (utmPos > -1) {
      url = url.substring(0, utmPos - 1);
    }
    /* Remove extra line breaks. */
    url = url.replace(/(\r\n|\n|\r)/gm, "");

    /* Some people use URLs without the protocol? Oh boy. */
    if (url.indexOf("http://") === -1 && url.indexOf("https://") === -1) {
      url = "http://" + url;
    }

    return url;
  },
  generate_code: function (data, options, res) {
    /*
  options = {
    'format': html/markdown
    'wrap-list': yes/undefined (wrap links inside a list?),
    'show-domain': yes/undefined (add domain name after the link)   
  }

  */
    var link_prefix = "",
      link_suffix = "";
    var include_domain = "";

    if (options["wrap-list"] === "yes") {
      if (options["format"] === "html") {
        link_prefix = "  <li>";
        link_suffix = "</li>";
      } else if (options["format"] === "markdown") {
        link_prefix = "- ";
      }
    }

    if (options.format === "html") {
      var code = data.map(function (pageData) {
        if (options["show-domain"] === "yes") {
          include_domain = ` (${pageData["domain"]})`;
        }

        return `${link_prefix}<a href="${pageData["original-url"]}">${pageData["title"]}</a>${include_domain}${link_suffix}`;
      });
    } else if (options.format === "markdown") {
      var code = data.map(function (pageData) {
        if (options["show-domain"] === "yes") {
          include_domain = ` (${pageData["domain"]})`;
        }

        return `${link_prefix}[${pageData["title"]}](${pageData["original-url"]})${include_domain}${link_suffix}`;
      });
    }

    code = code.join("\n");

    if (options.format === "html" && options["wrap-list"] === "yes") {
      code = "<ul>\n" + code + "\n</ul>";
    }

    res.render("formatter", {
      title: "Link formatter",
      description: "A simple tool for converting URLs into HTML/Markdown links.",
      code: code,
    });
  },
};
