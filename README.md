# Link formatter

![Link formatter](https://cdn.glitch.com/37a654b9-a52c-4f9c-9fab-82824e856b33%2Flink-formatter.gif?1500791349107)

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

Any questions? Feel free to send an email to [stefan@stefanbohacek.com](mailto:stefan@stefanbohacek.com) or a DM to [@stefanbohacek](https://stefanbohacek.online/@stefan).

I hope you'll find this tool useful!

# To-do

- Add option to add `target="_blank"` and `rel="noopener"` when HTML is selected as code format ([source](https://twitter.com/qubyte/status/889613996449554432))

# For developers

This project uses my [personal Glitch starter project](https://glitch.com/edit/#!/glitch-starter-project). I like using [gulp](http://gulpjs.com/), so that's what you are stuck with, sorry!

If you want to update the CSS and JS files, here's how to do it.

Open the console, and run `gulp`. (See screenshots below.) You can now edit all CSS and JS files inside the `src` folder and they will be updated without restarting your app.

![Step 1: Navigate to Advanced options](https://cdn.glitch.com/ade603f9-216b-48b0-a9d1-90c922a7237a%2Fhowto-01.PNG?1500481479450)

![Step 2: Open the console](https://cdn.glitch.com/ade603f9-216b-48b0-a9d1-90c922a7237a%2Fhowto-02.PNG?1500481479627)

![Step 3: Run gulp](https://cdn.glitch.com/ade603f9-216b-48b0-a9d1-90c922a7237a%2Fhowto-03.PNG?1500481612469)

For this particular project, I added [Bootstrap 4 Alpha](https://v4-alpha.getbootstrap.com/layout/grid/#grid-options). (Normally I just use the grid system.)

This project is hosted on [Glitch](https://glitch.com).

