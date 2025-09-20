# clNotify

A lightweight, dependency-free JavaScript library for displaying stackable notifications with optional icons and progress bars.

## Features
- **Simple API** – one global object (`clNotify`) with intuitive methods.
- **Stacked layout** – newest notifications appear on top and push older ones down.
- **Auto-close** with customizable duration.
- **Optional progress bar** showing the remaining time before auto-close.
- **Configurable icons** – use Unicode characters or custom HTML/SVG.
- **Multiple positions** – top/bottom and left/center/right.
- **Single file** – no build step required.

---

## Installation

To use clNotify, add the stylesheet inside the <head> of your HTML::

```html
<head>
...
<link rel="stylesheet" href="src/clNotify.css" />
...
</head>
```

and include the JavaScript file just before the closing </body> tag:

```html
...
<script src="src/clNotify.js"></script>
</body>
```

The library attaches a global object `clNotify` to `window`.

---

## Usage

### Basic Examples

```js
// Simple success notification
clNotify.success('Saved', 'Your changes have been saved.');

// Error with custom duration (5 seconds)
clNotify.error('Error', 'Something went wrong.', { duration: 5000 });

// Info notification without auto close
clNotify.info('Heads up', 'This will stay until clicked.', { autoClose: false });
```

### Custom Global Configuration

```js
clNotify.config({
  position: 'bottom-left',
  duration: 4000,
  autoClose: true,
  showIcon: true,
  progressBar: true,
  icons: {
    success: '✓', // Unicode
    error: '<i class="icon-x"></i>' // HTML/SVG allowed
  }
});
```

Global config affects all future notifications.
You can also pass the same options per notification:

```js
clNotify.warning(
  'Storage Almost Full',
  'Consider freeing up some space.',
  { duration: 7000, progressBar: true }
);
```

### Clear All Notifications

```js
clNotify.clear();
```

---

## API

`clNotify.config(options)`

Set or override global defaults.

| Option | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| **position** | `string` | `'top-right'` | Container position: 'top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'. |
| **duration** | `number` | `3000` | Auto-close delay in milliseconds. |
| **autoClose** | `boolean` | `true` | Whether the notification closes automatically. |
| **showIcon** | `boolean` | `true` | Show an icon next to the text. |
| **progressBar** | `boolean` | `false` | Show a bottom progress bar indicating remaining time. |
| **icons** | `object` | `{success:'✓',error:'✖',warning:'⚠',info:'ℹ'}` | Icons per type (Unicode, HTML, or SVG). |

---

```js
clNotify.success(title, message, [options])
clNotify.error(title, message, [options])
clNotify.warning(title, message, [options])
clNotify.info(title, message, [options])
```

Displays a notification of the specified type.

**Parameters:**
- `title`   (string) – Notification headline (optional but recommended)
- `message` (string) – Notification body text
- `options` (object) – Per-call settings that override the global configuration
                     (e.g. `{duration: 5000, position: 'bottom-left'}`)

---

```js
clNotify.clear()
```

Removes all currently active notifications from the DOM.

---

## Browser Support

Works in all modern browsers (Chrome, Edge, Firefox, Safari).
No external dependencies.

---

## License

MIT License – use freely in personal or commercial projects.

---

## Author

**Mariusz Panek**  
[Website](https://codelarix.dev) | [Email](mailto:mariusz@codelarix.dev)
