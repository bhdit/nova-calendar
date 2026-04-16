# Nova Calendar (bhdit fork)

Forked from [marshmallow-packages/nova-calendar](https://github.com/marshmallow-packages/nova-calendar).

## What this is

A Laravel Nova 5 tool that renders an event calendar. Originally month-view only; we're extending it with day/week views, click-to-create, and richer event rendering.

## Architecture

- **Month-view only** currently — `src/View/Month.php` is the only view implementation
- Frontend: Vue 3 + Inertia (no external calendar library — custom grid rendering)
- Data flow: `CalendarDataProvider` (in the host app) → `NovaEventGenerator` → `Event` objects → JSON API → Vue
- Events render as styled blocks in a month grid

## Key files

| File | Purpose |
|---|---|
| `src/NovaCalendar.php` | Nova Tool class — registers routes, assets |
| `src/ToolServiceProvider.php` | Package service provider |
| `src/DataProvider/AbstractCalendarDataProvider.php` | Base class host apps extend — defines events, styles, filters, timezone |
| `src/Event.php` | Event model — name, start, end, styles, badges, notes, url |
| `src/Badge.php` | Badge DTO for events/days |
| `src/View/AbstractView.php` | Base view class — date range calculation, event collection |
| `src/View/Month.php` | Month view implementation |
| `src/EventGenerator/NovaEventGenerator.php` | Converts Nova resources to Event objects |
| `src/Http/Controllers/CalendarController.php` | API endpoint returning calendar JSON |
| `resources/js/components/Tool.vue` | Main Vue component |

## Customization surface (for host app)

The host app creates a `CalendarDataProvider` subclass. Key overridable methods:

- `novaResources()` — which Nova resources to display + their date columns
- `customizeEvent(Event $event)` — modify individual events (add styles, badges, notes)
- `eventStyles()` — define CSS style maps keyed by name
- `filters()` — define filter dropdowns
- `timezone()` — calendar timezone
- `firstDayOfWeek()` — Monday/Sunday
- `nonNovaEvents()` — add events not backed by Nova resources
- `customizeCalendarDay(CalendarDay $day)` — add day-level badges

## Planned improvements (bhdit)

- [ ] Day view with time grid
- [ ] Week view with time grid
- [ ] Click empty slot → create event
- [ ] Native hex color support on Event (not just CSS styles)
- [ ] View switcher (day/week/month) in toolbar
- [ ] Staff/resource column mode in day view

## Development

This package is consumed by `clinichelp` as a composer path repo:
```json
{
    "type": "path",
    "url": "/Users/donkfather/work-projects/nova-calendar",
    "options": { "symlink": true }
}
```

Changes here are immediately reflected in `clinichelp` via the symlink. No composer update needed for source changes; only for new dependencies.

## Building frontend

```bash
cd /Users/donkfather/work-projects/nova-calendar
npm install
npm run build
```

The built JS/CSS goes to `dist/` and is loaded by Nova via the tool's service provider.
