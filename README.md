# Link formatter

A simple tool that turns URLs into HTML or Markdown links with proper titles. 

Put in some URLs:

```
https://botwiki.org
https://voice.mozilla.org/
https://www.technologyreview.com/s/608322/the-emerging-science-of-computational-psychiatry/
http://alanluo.com/procgen/midterm.html
```

And get HTML or Markdown code:

```
[Catalog of friendly, useful, artistic online bots, and resources that can help you make them | botwiki](https://botwiki.org) (botwiki.org)
[Common Voice](https://voice.mozilla.org/) (voice.mozilla.org)
[The Emerging Science of Computational Psychiatry - MIT Technology Review](https://www.technologyreview.com/s/608322/the-emerging-science-of-computational-psychiatry/) (technologyreview.com)
[Little Planet Procedural](http://alanluo.com/procgen/midterm.html) (alanluo.com)
```

Any questions? Here's how to [get in touch](https://stefanbohacek.com/contact/).

I hope you'll find this tool useful!

# To-do

- Add option to add `target="_blank"` and `rel="noopener"` when HTML is selected as code format ([source](https://twitter.com/qubyte/status/889613996449554432))

# For developers

You can now edit all CSS and JS files inside the `src` folder and use [gulp](http://gulpjs.com/) to compile them.
