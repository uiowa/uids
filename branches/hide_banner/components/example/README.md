# Example

You can use this `example component as a starting point to create a new component. For example, if you want to create a "widget" component, you would want to make a copy of this directory and rename the new directory and its contents as follows:
```bash
src/components/widget/
├── widget.config.yml
├── widget.scss
├── widget.twig
├── README.md
```

Remove any existing example content, such as this README text.

While you are developing your component, you will want to unhide the component by changing the value of `hidden` in `widget.config.yml` to `false`. However, until your component is accepted as part of UIDS, it needs to be set as `hidden: true` prior to merging your feature branch into the `main` branch.

