/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js":
/*!*******************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js ***!
  \*******************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var STATUS_LABELS = {
  scheduled: 'Programat',
  completed: 'Finalizat',
  cancelled: 'Anulat',
  no_show: 'Neprezentare',
  rescheduled: 'Reprogramat',
  pending: 'În așteptare'
};
var STATUS_COLORS = {
  scheduled: {
    bg: '#bfdbfe',
    text: '#1e3a8a'
  },
  completed: {
    bg: '#bbf7d0',
    text: '#14532d'
  },
  cancelled: {
    bg: '#fecaca',
    text: '#7f1d1d'
  },
  no_show: {
    bg: '#fed7aa',
    text: '#7c2d12'
  },
  rescheduled: {
    bg: '#ddd6fe',
    text: '#4c1d95'
  },
  pending: {
    bg: '#e2e8f0',
    text: '#334155'
  }
};
var ACTIONABLE_STATUSES = ['scheduled', 'pending', 'rescheduled'];
var TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
var ONE_DAY_MS = 24 * 60 * 60 * 1000;
var MONTHS_RO = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie', 'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
var MONTHS_RO_SHORT = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];
var TIMELINE_META = {
  'booking.created': {
    label: 'Programare creată',
    color: '#1e3a8a'
  },
  'booking.rescheduled': {
    label: 'Reprogramată',
    color: '#4c1d95'
  },
  'booking.cancelled': {
    label: 'Anulată',
    color: '#7f1d1d'
  },
  'booking.completed': {
    label: 'Finalizată',
    color: '#14532d'
  },
  'booking.no_show': {
    label: 'Neprezentare',
    color: '#7c2d12'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  props: {
    event: {
      type: Object,
      "default": null
    },
    open: {
      type: Boolean,
      "default": false
    },
    saving: {
      type: Boolean,
      "default": false
    }
  },
  emits: ['close', 'mark-completed', 'mark-no-show', 'cancel-booking', 'save-notes', 'go-to-resource'],
  data: function data() {
    return {
      showAbsolute: false,
      editingNotes: false,
      notesDraft: '',
      cancelling: false,
      cancelReason: '',
      windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1024
    };
  },
  computed: {
    isMobile: function isMobile() {
      return this.windowWidth < 768;
    },
    transitionName: function transitionName() {
      return this.isMobile ? 'nc-drawer-slide-up' : 'nc-drawer-slide-right';
    },
    statusLabel: function statusLabel() {
      var _this$event, _this$event2;
      return STATUS_LABELS[(_this$event = this.event) === null || _this$event === void 0 ? void 0 : _this$event.status] || ((_this$event2 = this.event) === null || _this$event2 === void 0 ? void 0 : _this$event2.status) || '';
    },
    statusPillStyle: function statusPillStyle() {
      var _this$event3;
      var entry = STATUS_COLORS[(_this$event3 = this.event) === null || _this$event3 === void 0 ? void 0 : _this$event3.status] || {
        bg: '#e5e7eb',
        text: '#374151'
      };
      return {
        backgroundColor: entry.bg,
        color: entry.text
      };
    },
    actionable: function actionable() {
      var _this$event4;
      return ACTIONABLE_STATUSES.includes((_this$event4 = this.event) === null || _this$event4 === void 0 ? void 0 : _this$event4.status);
    },
    startsAtDate: function startsAtDate() {
      var _this$event5;
      if (!((_this$event5 = this.event) !== null && _this$event5 !== void 0 && _this$event5.start)) return null;
      var d = new Date(this.event.start);
      return isNaN(d) ? null : d;
    },
    endsAtDate: function endsAtDate() {
      var _this$event6;
      if (!((_this$event6 = this.event) !== null && _this$event6 !== void 0 && _this$event6.end)) return null;
      var d = new Date(this.event.end);
      return isNaN(d) ? null : d;
    },
    diffMs: function diffMs() {
      if (!this.startsAtDate) return null;
      return this.startsAtDate.getTime() - Date.now();
    },
    relativeAvailable: function relativeAvailable() {
      return this.diffMs !== null && Math.abs(this.diffMs) <= TWELVE_HOURS_MS;
    },
    relativeText: function relativeText() {
      if (this.diffMs === null) return '';
      var abs = Math.abs(this.diffMs);
      var hours = Math.floor(abs / (60 * 60 * 1000));
      var minutes = Math.floor(abs % (60 * 60 * 1000) / (60 * 1000));
      var unit;
      if (hours >= 1) {
        unit = hours === 1 ? 'oră' : 'ore';
        if (this.diffMs >= 0) return "peste ".concat(hours, " ").concat(unit);
        return "acum ".concat(hours, " ").concat(unit);
      }
      unit = minutes === 1 ? 'minut' : 'minute';
      if (this.diffMs >= 0) return "peste ".concat(minutes, " ").concat(unit);
      return "acum ".concat(minutes, " ").concat(unit);
    },
    absoluteText: function absoluteText() {
      if (!this.startsAtDate) return '—';
      var s = this.startsAtDate;
      var e = this.endsAtDate;
      var dayMonthYear = "".concat(s.getDate(), " ").concat(MONTHS_RO[s.getMonth()], " ").concat(s.getFullYear());
      var startTime = "".concat(this.pad(s.getHours()), ":").concat(this.pad(s.getMinutes()));
      if (!e) return "".concat(dayMonthYear, ", ").concat(startTime);
      var endTime = "".concat(this.pad(e.getHours()), ":").concat(this.pad(e.getMinutes()));
      return "".concat(dayMonthYear, ", ").concat(startTime, " \u2013 ").concat(endTime);
    },
    whenDisplay: function whenDisplay() {
      if (!this.relativeAvailable) return this.absoluteText;
      return this.showAbsolute ? this.absoluteText : this.relativeText;
    },
    formResponseEntries: function formResponseEntries() {
      var _this$event7;
      var fr = (_this$event7 = this.event) === null || _this$event7 === void 0 ? void 0 : _this$event7.field_responses;
      if (!Array.isArray(fr)) return [];
      return fr.filter(function (entry) {
        return entry && entry.value !== null && entry.value !== '' && !(Array.isArray(entry.value) && entry.value.length === 0);
      }).map(function (entry) {
        return {
          key: entry.key,
          label: entry.label || entry.key,
          value: Array.isArray(entry.value) ? entry.value.join(', ') : String(entry.value)
        };
      });
    },
    timelineEntries: function timelineEntries() {
      var _this$event8,
        _this = this;
      var timeline = (_this$event8 = this.event) === null || _this$event8 === void 0 ? void 0 : _this$event8.timeline;
      if (!Array.isArray(timeline)) return [];
      return timeline.map(function (entry) {
        return _this.formatTimelineEntry(entry);
      });
    }
  },
  watch: {
    event: function event() {
      this.resetTransientState();
    },
    open: function open(isOpen) {
      if (isOpen) {
        this.resetTransientState();
        document.addEventListener('keydown', this.handleEscape);
      } else {
        document.removeEventListener('keydown', this.handleEscape);
      }
    }
  },
  mounted: function mounted() {
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount: function beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
    document.removeEventListener('keydown', this.handleEscape);
  },
  methods: {
    pad: function pad(n) {
      return String(n).padStart(2, '0');
    },
    handleResize: function handleResize() {
      this.windowWidth = window.innerWidth;
    },
    handleEscape: function handleEscape(e) {
      if (e.key === 'Escape') this.$emit('close');
    },
    onToggleWhen: function onToggleWhen() {
      if (this.relativeAvailable) this.showAbsolute = !this.showAbsolute;
    },
    startEditingNotes: function startEditingNotes() {
      var _this$event9;
      this.notesDraft = ((_this$event9 = this.event) === null || _this$event9 === void 0 ? void 0 : _this$event9.notes) || '';
      this.editingNotes = true;
    },
    cancelEditingNotes: function cancelEditingNotes() {
      this.editingNotes = false;
      this.notesDraft = '';
    },
    resetTransientState: function resetTransientState() {
      this.showAbsolute = false;
      this.editingNotes = false;
      this.notesDraft = '';
      this.cancelling = false;
      this.cancelReason = '';
    },
    formatTimelineEntry: function formatTimelineEntry(entry) {
      var _entry$data, _entry$data2;
      var meta = TIMELINE_META[entry.type] || {
        label: entry.type,
        color: '#6b7280'
      };
      var date = entry.occurred_at ? new Date(entry.occurred_at) : null;
      var valid = date && !isNaN(date);
      var now = Date.now();
      var absolute = valid ? this.formatCompactDate(date) : '';
      var displayTime = absolute;
      if (valid && now - date.getTime() <= ONE_DAY_MS && date.getTime() <= now) {
        displayTime = this.formatRelativePast(date, now);
      }
      var detail = ((_entry$data = entry.data) === null || _entry$data === void 0 ? void 0 : _entry$data.reference) || ((_entry$data2 = entry.data) === null || _entry$data2 === void 0 ? void 0 : _entry$data2.service) || '';
      return {
        id: entry.id,
        label: meta.label,
        color: meta.color,
        detail: detail,
        displayTime: displayTime,
        absoluteTime: absolute
      };
    },
    formatCompactDate: function formatCompactDate(date) {
      return "".concat(date.getDate(), " ").concat(MONTHS_RO_SHORT[date.getMonth()], " ").concat(date.getFullYear(), ", ").concat(this.pad(date.getHours()), ":").concat(this.pad(date.getMinutes()));
    },
    formatRelativePast: function formatRelativePast(date, now) {
      var diff = now - date.getTime();
      var minutes = Math.floor(diff / (60 * 1000));
      if (minutes < 1) return 'acum câteva secunde';
      if (minutes < 60) return "acum ".concat(minutes, " ").concat(minutes === 1 ? 'minut' : 'minute');
      var hours = Math.floor(minutes / 60);
      return "acum ".concat(hours, " ").concat(hours === 1 ? 'oră' : 'ore');
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=script&lang=js":
/*!*************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=script&lang=js ***!
  \*************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var STATUS_COLORS = {
  scheduled: {
    bg: '#bfdbfe',
    text: '#1e3a8a'
  },
  completed: {
    bg: '#bbf7d0',
    text: '#14532d'
  },
  cancelled: {
    bg: '#fecaca',
    text: '#7f1d1d'
  },
  no_show: {
    bg: '#fed7aa',
    text: '#7c2d12'
  },
  rescheduled: {
    bg: '#ddd6fe',
    text: '#4c1d95'
  },
  pending: {
    bg: '#e2e8f0',
    text: '#334155'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'DayView',
  props: {
    events: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    currentDate: {
      type: String,
      required: true
    },
    staffList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  emits: ['open-event'],
  data: function data() {
    return {
      startHour: 7,
      endHour: 22,
      nowMinutes: this.getCurrentMinutes(),
      nowTimer: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    // Auto-scroll to current hour - 1
    this.$nextTick(function () {
      if (_this.$refs.gridBody) {
        var now = new Date();
        var currentHour = now.getHours();
        var scrollToHour = Math.max(_this.startHour, currentHour - 1);
        var ROW_HEIGHT = 24;
        var slotsFromStart = (scrollToHour - _this.startHour) * 2;
        _this.$refs.gridBody.scrollTop = slotsFromStart * ROW_HEIGHT;
      }
    });

    // Update now indicator every minute
    this.nowTimer = setInterval(function () {
      _this.nowMinutes = _this.getCurrentMinutes();
    }, 60000);
  },
  beforeUnmount: function beforeUnmount() {
    if (this.nowTimer) {
      clearInterval(this.nowTimer);
    }
  },
  computed: {
    displayStaff: function displayStaff() {
      return this.staffList.length > 0 ? this.staffList : [{
        id: 0,
        name: 'Toate',
        color: '#4299e1'
      }];
    },
    colCount: function colCount() {
      return this.displayStaff.length + 1; // +1 for gutter
    },
    headerGridStyle: function headerGridStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: "60px repeat(".concat(this.displayStaff.length, ", 1fr)")
      };
    },
    bodyGridStyle: function bodyGridStyle() {
      return {
        position: 'relative'
      };
    },
    rowGridStyle: function rowGridStyle() {
      return {
        display: 'grid',
        gridTemplateColumns: "60px repeat(".concat(this.displayStaff.length, ", 1fr)")
      };
    },
    timeSlots: function timeSlots() {
      var slots = [];
      for (var h = this.startHour; h <= this.endHour; h++) {
        slots.push({
          time: "".concat(String(h).padStart(2, '0'), ":00"),
          label: "".concat(String(h).padStart(2, '0'), ":00"),
          isHour: true,
          minutes: h * 60
        });
        if (h < this.endHour) {
          slots.push({
            time: "".concat(String(h).padStart(2, '0'), ":30"),
            label: '',
            isHour: false,
            minutes: h * 60 + 30
          });
        }
      }
      return slots;
    },
    nowIndicatorStyle: function nowIndicatorStyle() {
      var now = new Date();
      var todayStr = this.formatDate(now);
      if (todayStr !== this.currentDate) return null;
      var minutes = this.nowMinutes;
      if (minutes < this.startHour * 60 || minutes > this.endHour * 60) return null;
      var ROW_HEIGHT = 24;
      var minutesFromStart = minutes - this.startHour * 60;
      var top = minutesFromStart / 30 * ROW_HEIGHT;
      return {
        top: "".concat(top, "px")
      };
    },
    positionedEvents: function positionedEvents() {
      var _this2 = this;
      var ROW_HEIGHT = 24;
      var GUTTER_WIDTH = 60;
      return this.events.map(function (event) {
        var _this2$displayStaff$c;
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        var startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
        var endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
        var clampedStart = Math.max(startMinutes, _this2.startHour * 60);
        var clampedEnd = Math.min(endMinutes, _this2.endHour * 60);
        if (clampedEnd <= clampedStart) return null;
        var topSlots = (clampedStart - _this2.startHour * 60) / 30;
        var heightSlots = (clampedEnd - clampedStart) / 30;

        // Find staff column
        var staffIndex = _this2.displayStaff.findIndex(function (s) {
          return s.id === event.staff_id;
        });
        var colIndex = staffIndex !== -1 ? staffIndex : 0;
        var totalCols = _this2.displayStaff.length;
        var staffColor = ((_this2$displayStaff$c = _this2.displayStaff[colIndex]) === null || _this2$displayStaff$c === void 0 ? void 0 : _this2$displayStaff$c.color) || '#4299e1';
        var statusPair = STATUS_COLORS[event.status] || STATUS_COLORS.scheduled;
        var startTimeStr = "".concat(String(eventStart.getHours()).padStart(2, '0'), ":").concat(String(eventStart.getMinutes()).padStart(2, '0'));
        var endTimeStr = "".concat(String(eventEnd.getHours()).padStart(2, '0'), ":").concat(String(eventEnd.getMinutes()).padStart(2, '0'));
        return _objectSpread(_objectSpread({}, event), {}, {
          startTime: startTimeStr,
          endTime: endTimeStr,
          style: {
            position: 'absolute',
            top: "".concat(topSlots * ROW_HEIGHT, "px"),
            height: "".concat(Math.max(heightSlots * ROW_HEIGHT - 2, 18), "px"),
            left: "calc(".concat(GUTTER_WIDTH, "px + ").concat(colIndex, " * ((100% - ").concat(GUTTER_WIDTH, "px) / ").concat(totalCols, ") + 2px)"),
            width: "calc((100% - ".concat(GUTTER_WIDTH, "px) / ").concat(totalCols, " - 4px)"),
            backgroundColor: statusPair.bg,
            color: statusPair.text,
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '11px',
            overflow: 'hidden',
            cursor: 'pointer',
            zIndex: 10,
            borderTop: "4px solid ".concat(staffColor),
            textDecoration: event.status === 'cancelled' ? 'line-through' : 'none'
          }
        });
      }).filter(Boolean);
    }
  },
  methods: {
    getCurrentMinutes: function getCurrentMinutes() {
      var now = new Date();
      return now.getHours() * 60 + now.getMinutes();
    },
    formatDate: function formatDate(d) {
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return "".concat(y, "-").concat(m, "-").concat(day);
    },
    darkenColor: function darkenColor(hex, amount) {
      var color = hex.replace('#', '');
      if (color.length === 3) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
      }
      var num = parseInt(color, 16);
      var r = Math.max(0, (num >> 16) - amount);
      var g = Math.max(0, (num >> 8 & 0x00ff) - amount);
      var b = Math.max(0, (num & 0x0000ff) - amount);
      return "#".concat((r << 16 | g << 8 | b).toString(16).padStart(6, '0'));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=script&lang=js":
/*!**************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=script&lang=js ***!
  \**************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
var STATUS_COLORS = {
  scheduled: {
    bg: '#bfdbfe',
    text: '#1e3a8a'
  },
  completed: {
    bg: '#bbf7d0',
    text: '#14532d'
  },
  cancelled: {
    bg: '#fecaca',
    text: '#7f1d1d'
  },
  no_show: {
    bg: '#fed7aa',
    text: '#7c2d12'
  },
  rescheduled: {
    bg: '#ddd6fe',
    text: '#4c1d95'
  },
  pending: {
    bg: '#e2e8f0',
    text: '#334155'
  }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'WeekView',
  props: {
    events: {
      type: Array,
      "default": function _default() {
        return [];
      }
    },
    weekStart: {
      type: String,
      required: true
    },
    staffList: {
      type: Array,
      "default": function _default() {
        return [];
      }
    }
  },
  emits: ['open-event'],
  data: function data() {
    return {
      startHour: 7,
      endHour: 22,
      nowMinutes: this.getCurrentMinutes(),
      nowTimer: null
    };
  },
  mounted: function mounted() {
    var _this = this;
    // Auto-scroll to current hour - 1
    this.$nextTick(function () {
      if (_this.$refs.gridBody) {
        var now = new Date();
        var currentHour = now.getHours();
        var scrollToHour = Math.max(_this.startHour, currentHour - 1);
        var ROW_HEIGHT = 24;
        var slotsFromStart = (scrollToHour - _this.startHour) * 2;
        _this.$refs.gridBody.scrollTop = slotsFromStart * ROW_HEIGHT;
      }
    });

    // Update now indicator every minute
    this.nowTimer = setInterval(function () {
      _this.nowMinutes = _this.getCurrentMinutes();
    }, 60000);
  },
  beforeUnmount: function beforeUnmount() {
    if (this.nowTimer) {
      clearInterval(this.nowTimer);
    }
  },
  computed: {
    days: function days() {
      var start = new Date(this.weekStart + 'T00:00:00');
      var result = [];
      var today = new Date();
      today.setHours(0, 0, 0, 0);
      var dayNames = ['DUM', 'LUN', 'MAR', 'MIE', 'JOI', 'VIN', 'SAM'];
      for (var i = 0; i < 7; i++) {
        var d = new Date(start);
        d.setDate(d.getDate() + i);
        var dateStr = this.formatDate(d);
        result.push({
          dateStr: dateStr,
          dayName: dayNames[d.getDay()],
          dayNumber: d.getDate(),
          isToday: d.getTime() === today.getTime(),
          index: i
        });
      }
      return result;
    },
    timeSlots: function timeSlots() {
      var slots = [];
      for (var h = this.startHour; h <= this.endHour; h++) {
        slots.push({
          time: "".concat(String(h).padStart(2, '0'), ":00"),
          label: "".concat(String(h).padStart(2, '0'), ":00"),
          isHour: true,
          minutes: h * 60
        });
        if (h < this.endHour) {
          slots.push({
            time: "".concat(String(h).padStart(2, '0'), ":30"),
            label: '',
            isHour: false,
            minutes: h * 60 + 30
          });
        }
      }
      return slots;
    },
    totalMinutes: function totalMinutes() {
      return (this.endHour - this.startHour) * 60;
    },
    nowIndicatorStyle: function nowIndicatorStyle() {
      var now = new Date();
      var todayStr = this.formatDate(now);
      var todayIndex = this.days.findIndex(function (d) {
        return d.dateStr === todayStr;
      });
      if (todayIndex === -1) return null;
      var minutes = this.nowMinutes;
      if (minutes < this.startHour * 60 || minutes > this.endHour * 60) return null;
      var ROW_HEIGHT = 24;
      var minutesFromStart = minutes - this.startHour * 60;
      var top = minutesFromStart / 30 * ROW_HEIGHT;
      return {
        top: "".concat(top, "px")
      };
    },
    positionedEvents: function positionedEvents() {
      var _this2 = this;
      var ROW_HEIGHT = 24;
      return this.events.map(function (event) {
        var eventStart = new Date(event.start);
        var eventEnd = new Date(event.end);
        var eventDateStr = _this2.formatDate(eventStart);
        var dayIndex = _this2.days.findIndex(function (d) {
          return d.dateStr === eventDateStr;
        });
        if (dayIndex === -1) return null;
        var startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
        var endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();
        var clampedStart = Math.max(startMinutes, _this2.startHour * 60);
        var clampedEnd = Math.min(endMinutes, _this2.endHour * 60);
        if (clampedEnd <= clampedStart) return null;
        var topSlots = (clampedStart - _this2.startHour * 60) / 30;
        var heightSlots = (clampedEnd - clampedStart) / 30;
        var staffColor = _this2.getStaffColor(event.staff_id);
        var statusPair = STATUS_COLORS[event.status] || STATUS_COLORS.scheduled;
        var startTimeStr = "".concat(String(eventStart.getHours()).padStart(2, '0'), ":").concat(String(eventStart.getMinutes()).padStart(2, '0'));
        var endTimeStr = "".concat(String(eventEnd.getHours()).padStart(2, '0'), ":").concat(String(eventEnd.getMinutes()).padStart(2, '0'));
        return _objectSpread(_objectSpread({}, event), {}, {
          startTime: startTimeStr,
          endTime: endTimeStr,
          style: {
            position: 'absolute',
            top: "".concat(topSlots * ROW_HEIGHT, "px"),
            height: "".concat(Math.max(heightSlots * ROW_HEIGHT - 2, 18), "px"),
            left: "calc(60px + ".concat(dayIndex, " * ((100% - 60px) / 7) + 2px)"),
            width: "calc((100% - 60px) / 7 - 4px)",
            backgroundColor: statusPair.bg,
            color: statusPair.text,
            borderRadius: '6px',
            padding: '2px 6px',
            fontSize: '11px',
            overflow: 'hidden',
            cursor: 'pointer',
            zIndex: 10,
            borderTop: "4px solid ".concat(staffColor),
            textDecoration: event.status === 'cancelled' ? 'line-through' : 'none'
          }
        });
      }).filter(Boolean);
    }
  },
  methods: {
    getCurrentMinutes: function getCurrentMinutes() {
      var now = new Date();
      return now.getHours() * 60 + now.getMinutes();
    },
    formatDate: function formatDate(d) {
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return "".concat(y, "-").concat(m, "-").concat(day);
    },
    getStaffColor: function getStaffColor(staffId) {
      var staff = this.staffList.find(function (s) {
        return s.id === staffId;
      });
      return staff ? staff.color : '#4299e1';
    },
    darkenColor: function darkenColor(hex, amount) {
      var color = hex.replace('#', '');
      if (color.length === 3) {
        color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
      }
      var num = parseInt(color, 16);
      var r = Math.max(0, (num >> 16) - amount);
      var g = Math.max(0, (num >> 8 & 0x00ff) - amount);
      var b = Math.max(0, (num & 0x0000ff) - amount);
      return "#".concat((r << 16 | g << 8 | b).toString(16).padStart(6, '0'));
    }
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js":
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _components_WeekView_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/WeekView.vue */ "./resources/js/components/WeekView.vue");
/* harmony import */ var _components_DayView_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/DayView.vue */ "./resources/js/components/DayView.vue");
/* harmony import */ var _components_BookingDrawer_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/BookingDrawer.vue */ "./resources/js/components/BookingDrawer.vue");
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  components: {
    WeekView: _components_WeekView_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
    DayView: _components_DayView_vue__WEBPACK_IMPORTED_MODULE_1__["default"],
    BookingDrawer: _components_BookingDrawer_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  mounted: function mounted() {
    var _this = this;
    this.init();
    Nova.addShortcut("alt+right", function (event) {
      _this.nextPeriod();
    });
    Nova.addShortcut("alt+left", function (event) {
      _this.prevPeriod();
    });
    Nova.addShortcut("alt+h", function (event) {
      _this.reset();
    });
  },
  methods: {
    reset: function reset() {
      this.month = null;
      this.year = null;
      this.currentDay = new Date();
      this.currentWeekStart = this.getMonday(new Date());
      if (this.activeView === 'month') {
        this.reload();
      } else {
        this.loadTimeGridEvents();
      }
    },
    init: function init() {
      this.currentDay = new Date();
      this.currentWeekStart = this.getMonday(new Date());
      this.loadStaffList();
      if (this.hasStoredSettings()) {
        this.restoreSettings();
        if (this.activeView === 'month') {
          this.reload(false);
        } else {
          this.loadTimeGridEvents();
        }
      } else {
        this.reload(true);
      }
    },
    switchView: function switchView(view) {
      this.activeView = view;
      this.storeSettings();
      if (view === 'month') {
        this.reload();
      } else {
        this.loadTimeGridEvents();
      }
    },
    prevPeriod: function prevPeriod() {
      if (this.activeView === 'month') {
        this.month -= 1;
        this.reload();
      } else if (this.activeView === 'week') {
        var d = new Date(this.currentWeekStart);
        d.setDate(d.getDate() - 7);
        this.currentWeekStart = d;
        this.loadTimeGridEvents();
      } else if (this.activeView === 'day') {
        var _d = new Date(this.currentDay);
        _d.setDate(_d.getDate() - 1);
        this.currentDay = _d;
        this.loadTimeGridEvents();
      }
    },
    nextPeriod: function nextPeriod() {
      if (this.activeView === 'month') {
        this.month += 1;
        this.reload();
      } else if (this.activeView === 'week') {
        var d = new Date(this.currentWeekStart);
        d.setDate(d.getDate() + 7);
        this.currentWeekStart = d;
        this.loadTimeGridEvents();
      } else if (this.activeView === 'day') {
        var _d2 = new Date(this.currentDay);
        _d2.setDate(_d2.getDate() + 1);
        this.currentDay = _d2;
        this.loadTimeGridEvents();
      }
    },
    reload: function reload() {
      var _this2 = this;
      var isInitRequest = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var vue = this;
      vue.loading = true;
      var apiUrl = "/nova-vendor/marshmallow/nova-calendar" + this.calendarUrl() + "/month?y=" + vue.year + "&m=" + vue.month;
      if (vue.activeFilterKey) {
        apiUrl += "&filter=" + vue.activeFilterKey;
      } else if (isInitRequest) {
        apiUrl += "&isInitRequest=1";
      }
      Nova.request().get(apiUrl).then(function (response) {
        vue.styles = response.data.styles;
        vue.year = response.data.year;
        vue.month = response.data.month;
        vue.monthLabels = response.data.monthLabels;
        vue.windowTitle = response.data.windowTitle;
        vue.resetFiltersLabel = response.data.resetFiltersLabel;
        vue.availableFilters = response.data.filters;
        vue.activeFilterKey = response.data.activeFilterKey;
        vue.title = response.data.title;
        vue.columns = response.data.columns;
        vue.weeks = response.data.weeks;
        _this2.setFilter(vue.activeFilterKey);
        vue.loading = false;
        _this2.storeSettings();
      });
    },
    loadStaffList: function loadStaffList() {
      var _this3 = this;
      Nova.request().get("/manage/calendar/resources").then(function (response) {
        _this3.staffList = response.data.staff || [];
      })["catch"](function () {
        _this3.staffList = [];
      });
    },
    loadTimeGridEvents: function loadTimeGridEvents() {
      var _this4 = this;
      var startDate, endDate;
      if (this.activeView === 'week') {
        startDate = this.formatDate(this.currentWeekStart);
        var end = new Date(this.currentWeekStart);
        end.setDate(end.getDate() + 6);
        endDate = this.formatDate(end);
      } else {
        startDate = this.formatDate(this.currentDay);
        endDate = startDate;
      }
      var url = "/manage/calendar/events?start=".concat(startDate, "&end=").concat(endDate);
      if (this.selectedStaffIds.length > 0) {
        this.selectedStaffIds.forEach(function (id) {
          url += "&staff[]=".concat(id);
        });
      }
      this.loading = true;
      Nova.request().get(url).then(function (response) {
        _this4.timeGridEvents = response.data || [];
        _this4.loading = false;
        _this4.storeSettings();
      })["catch"](function () {
        _this4.timeGridEvents = [];
        _this4.loading = false;
      });
    },
    toggleStaffFilter: function toggleStaffFilter(staffId) {
      var idx = this.selectedStaffIds.indexOf(staffId);
      if (idx === -1) {
        this.selectedStaffIds.push(staffId);
      } else {
        this.selectedStaffIds.splice(idx, 1);
      }
      this.loadTimeGridEvents();
    },
    openTimeGridEvent: function openTimeGridEvent(e, event) {
      this.open(e, event);
    },
    open: function open(e, event) {
      if (!event || !event.url) return;
      if (e && (e.metaKey || e.ctrlKey)) {
        window.open(Nova.url(event.url));
        return;
      }
      // Month-view events don't carry `id` directly — parse it from
      // the resource URL (format: /resources/{uriKey}/{id}).
      var normalized = event;
      if (!event.id) {
        var match = String(event.url).match(/\/resources\/[^/]+\/(\d+)/);
        if (match) {
          normalized = _objectSpread(_objectSpread({}, event), {}, {
            id: Number(match[1])
          });
        }
      }
      this.drawerEvent = normalized;
      this.drawerOpen = true;
      this.refreshDrawerEvent();
    },
    closeDrawer: function closeDrawer() {
      this.drawerOpen = false;
      this.drawerSaving = false;
    },
    refreshDrawerEvent: function refreshDrawerEvent() {
      var _this$drawerEvent,
        _this5 = this;
      if (!((_this$drawerEvent = this.drawerEvent) !== null && _this$drawerEvent !== void 0 && _this$drawerEvent.id)) return Promise.resolve();
      return Nova.request().get("/manage/calendar/events/".concat(this.drawerEvent.id)).then(function (response) {
        _this5.drawerEvent = response.data;
      })["catch"](function (err) {
        var _err$response;
        if ((err === null || err === void 0 || (_err$response = err.response) === null || _err$response === void 0 ? void 0 : _err$response.status) === 404) {
          _this5.closeDrawer();
          Nova.error("Programare indisponibilă");
        }
      });
    },
    refreshCurrentView: function refreshCurrentView() {
      if (this.activeView === "month") {
        this.reload(false);
      } else {
        this.loadTimeGridEvents();
      }
    },
    postStatus: function postStatus(status) {
      var _this$drawerEvent2,
        _this6 = this;
      var reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      if (!((_this$drawerEvent2 = this.drawerEvent) !== null && _this$drawerEvent2 !== void 0 && _this$drawerEvent2.id)) return;
      var payload = {
        status: status
      };
      if (reason) payload.reason = reason;
      this.drawerSaving = true;
      Nova.request().patch("/manage/calendar/events/".concat(this.drawerEvent.id, "/status"), payload).then(function () {
        _this6.refreshCurrentView();
        return _this6.refreshDrawerEvent();
      })["catch"](function (err) {
        var _err$response2;
        var msg = (err === null || err === void 0 || (_err$response2 = err.response) === null || _err$response2 === void 0 || (_err$response2 = _err$response2.data) === null || _err$response2 === void 0 ? void 0 : _err$response2.message) || "Acțiunea a eșuat. Încearcă din nou.";
        Nova.error(msg);
      })["finally"](function () {
        _this6.drawerSaving = false;
      });
    },
    onMarkCompleted: function onMarkCompleted() {
      this.postStatus("completed");
    },
    onMarkNoShow: function onMarkNoShow() {
      this.postStatus("no_show");
    },
    onCancelBooking: function onCancelBooking(payload) {
      this.postStatus("cancelled", (payload === null || payload === void 0 ? void 0 : payload.reason) || null);
    },
    onSaveNotes: function onSaveNotes(payload) {
      var _this$drawerEvent3,
        _payload$notes,
        _this7 = this;
      if (!((_this$drawerEvent3 = this.drawerEvent) !== null && _this$drawerEvent3 !== void 0 && _this$drawerEvent3.id)) return;
      this.drawerSaving = true;
      Nova.request().put("/manage/calendar/events/".concat(this.drawerEvent.id), {
        notes: (_payload$notes = payload === null || payload === void 0 ? void 0 : payload.notes) !== null && _payload$notes !== void 0 ? _payload$notes : ""
      }).then(function () {
        _this7.refreshCurrentView();
        return _this7.refreshDrawerEvent();
      })["catch"](function () {
        Nova.error("Salvarea notițelor a eșuat.");
      })["finally"](function () {
        _this7.drawerSaving = false;
      });
    },
    onGoToResource: function onGoToResource() {
      var _this$drawerEvent4;
      if ((_this$drawerEvent4 = this.drawerEvent) !== null && _this$drawerEvent4 !== void 0 && _this$drawerEvent4.url) {
        Nova.visit(this.drawerEvent.url);
      }
    },
    stylesForEvent: function stylesForEvent(event) {
      var _this8 = this;
      if (event.options.styles) {
        var out = [this.styles["default"]];
        event.options.styles.forEach(function (style) {
          if (_this8.styles[style] === undefined) {
            console.log("[nova-calendar] Unknown custom style name '" + style + "'; does the eventStyles method of your CalendarDataProvider define it properly?");
          } else {
            out.push(_this8.styles[style]);
          }
        });
        return out;
      } else {
        return this.styles["default"];
      }
    },
    chooseFilter: function chooseFilter(filterKey) {
      this.setFilter(filterKey);
      this.reload();
    },
    setFilter: function setFilter(filterKey) {
      this.activeFilterKey = filterKey;
      for (var filterKey in this.availableFilters) {
        if (this.activeFilterKey == filterKey) {
          this.activeFilterLabel = this.availableFilters[filterKey];
        }
      }
    },
    calendarUrl: function calendarUrl() {
      var url = window.location.pathname.substring(Nova.url("").length);
      return url.startsWith("/") ? url : "/" + url;
    },
    storageKey: function storageKey() {
      return "marshmallow-nova-calendar-" + this.calendarUrl();
    },
    hasStoredSettings: function hasStoredSettings() {
      return localStorage.getItem(this.storageKey()) !== null;
    },
    storeSettings: function storeSettings() {
      localStorage.setItem(this.storageKey(), JSON.stringify({
        year: this.year,
        month: this.month,
        activeFilterKey: this.activeFilterKey,
        activeView: this.activeView,
        selectedStaffIds: this.selectedStaffIds
      }));
    },
    restoreSettings: function restoreSettings() {
      var storedData = JSON.parse(localStorage.getItem(this.storageKey()));
      if (storedData) {
        this.year = storedData.year;
        this.month = storedData.month;
        this.activeFilterKey = storedData.activeFilterKey;
        if (storedData.activeView) {
          this.activeView = storedData.activeView;
        }
        if (storedData.selectedStaffIds) {
          this.selectedStaffIds = storedData.selectedStaffIds;
        }
      }
    },
    getMonday: function getMonday(d) {
      var date = new Date(d);
      var day = date.getDay();
      var diff = date.getDate() - day + (day === 0 ? -6 : 1);
      date.setDate(diff);
      date.setHours(0, 0, 0, 0);
      return date;
    },
    formatDate: function formatDate(d) {
      var y = d.getFullYear();
      var m = String(d.getMonth() + 1).padStart(2, '0');
      var day = String(d.getDate()).padStart(2, '0');
      return "".concat(y, "-").concat(m, "-").concat(day);
    }
  },
  computed: {
    viewOptions: function viewOptions() {
      return [{
        key: 'month',
        label: "Lun\u0103"
      }, {
        key: 'week',
        label: "S\u0103pt\u0103m\xE2n\u0103"
      }, {
        key: 'day',
        label: 'Zi'
      }];
    },
    activeViewLabel: function activeViewLabel() {
      var _this$viewOptions$fin,
        _this9 = this;
      return ((_this$viewOptions$fin = this.viewOptions.find(function (v) {
        return v.key === _this9.activeView;
      })) === null || _this$viewOptions$fin === void 0 ? void 0 : _this$viewOptions$fin.label) || '';
    },
    weekStartDate: function weekStartDate() {
      return this.formatDate(this.currentWeekStart);
    },
    currentDayDate: function currentDayDate() {
      return this.formatDate(this.currentDay);
    },
    displayTitle: function displayTitle() {
      if (this.activeView === 'month') {
        return this.title;
      }
      var monthShort = ['ian', 'feb', 'mar', 'apr', 'mai', 'iun', 'iul', 'aug', 'sep', 'oct', 'noi', 'dec'];
      if (this.activeView === 'week') {
        var start = new Date(this.currentWeekStart);
        var end = new Date(this.currentWeekStart);
        end.setDate(end.getDate() + 6);
        var startDay = start.getDate();
        var endDay = end.getDate();
        var year = end.getFullYear();
        if (start.getMonth() === end.getMonth()) {
          return "".concat(startDay, "\u2013").concat(endDay, " ").concat(monthShort[start.getMonth()], " ").concat(year);
        }
        return "".concat(startDay, " ").concat(monthShort[start.getMonth()], " \u2013 ").concat(endDay, " ").concat(monthShort[end.getMonth()], " ").concat(year);
      }
      if (this.activeView === 'day') {
        var d = new Date(this.currentDay);
        var dayShort = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', "s\xE2m"];
        return "".concat(dayShort[d.getDay()], ", ").concat(d.getDate(), " ").concat(monthShort[d.getMonth()], " ").concat(d.getFullYear());
      }
      return '';
    },
    displayStaffForDay: function displayStaffForDay() {
      var _this0 = this;
      if (this.selectedStaffIds.length > 0) {
        return this.staffList.filter(function (s) {
          return _this0.selectedStaffIds.includes(s.id);
        });
      }
      return this.staffList;
    }
  },
  props: {},
  data: function data() {
    return {
      loading: true,
      activeView: "month",
      resetFiltersLabel: "All events",
      availableFilters: {},
      activeFilterKey: null,
      activeFilterLabel: null,
      year: null,
      month: null,
      monthLabels: Array(12).fill(""),
      windowTitle: "",
      title: "",
      columns: Array(7).fill("-"),
      weeks: Array(6).fill(Array(7).fill({})),
      styles: {
        "default": {
          color: "#fff",
          "background-color": "rgba(var(--colors-primary-500), 0.9)"
        }
      },
      // Time grid views data
      timeGridEvents: [],
      staffList: [],
      selectedStaffIds: [],
      currentDay: new Date(),
      currentWeekStart: new Date(),
      // Drawer state
      drawerOpen: false,
      drawerEvent: null,
      drawerSaving: false
    };
  }
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true":
/*!***********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true ***!
  \***********************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);

var _hoisted_1 = {
  "class": "nc-drawer-header"
};
var _hoisted_2 = {
  "class": "nc-drawer-title"
};
var _hoisted_3 = {
  "class": "nc-drawer-body"
};
var _hoisted_4 = {
  key: 0,
  "class": "nc-field"
};
var _hoisted_5 = {
  "class": "nc-field-value nc-reference"
};
var _hoisted_6 = {
  "class": "nc-field"
};
var _hoisted_7 = {
  key: 1,
  "class": "nc-field"
};
var _hoisted_8 = {
  "class": "nc-field-value"
};
var _hoisted_9 = {
  key: 0
};
var _hoisted_10 = {
  key: 2,
  "class": "nc-field"
};
var _hoisted_11 = {
  "class": "nc-field-value"
};
var _hoisted_12 = {
  "class": "nc-field"
};
var _hoisted_13 = {
  "class": "nc-field-value"
};
var _hoisted_14 = ["href"];
var _hoisted_15 = ["href"];
var _hoisted_16 = {
  "class": "nc-field"
};
var _hoisted_17 = {
  "class": "nc-field-label-row"
};
var _hoisted_18 = {
  key: 0,
  "class": "nc-field-value nc-notes"
};
var _hoisted_19 = {
  key: 0
};
var _hoisted_20 = {
  key: 1,
  "class": "nc-notes-editor"
};
var _hoisted_21 = {
  "class": "nc-inline-actions"
};
var _hoisted_22 = ["disabled"];
var _hoisted_23 = {
  key: 3,
  "class": "nc-field"
};
var _hoisted_24 = {
  "class": "nc-form-responses"
};
var _hoisted_25 = {
  key: 4,
  "class": "nc-field"
};
var _hoisted_26 = {
  "class": "nc-timeline"
};
var _hoisted_27 = {
  "class": "nc-timeline-content"
};
var _hoisted_28 = {
  "class": "nc-timeline-label"
};
var _hoisted_29 = {
  key: 0,
  "class": "nc-timeline-detail"
};
var _hoisted_30 = ["title"];
var _hoisted_31 = {
  key: 5,
  "class": "nc-field"
};
var _hoisted_32 = {
  key: 0,
  "class": "nc-action-buttons"
};
var _hoisted_33 = ["disabled"];
var _hoisted_34 = ["disabled"];
var _hoisted_35 = ["disabled"];
var _hoisted_36 = {
  key: 1,
  "class": "nc-cancel-form"
};
var _hoisted_37 = {
  "class": "nc-inline-actions"
};
var _hoisted_38 = ["disabled"];
var _hoisted_39 = {
  "class": "nc-drawer-footer"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Teleport, {
    to: "body"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
    name: "nc-drawer-fade"
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$props.open ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: 0,
        "class": "nc-drawer-backdrop",
        onClick: _cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function ($event) {
          return _ctx.$emit('close');
        }, ["self"]))
      }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(vue__WEBPACK_IMPORTED_MODULE_0__.Transition, {
        name: $options.transitionName,
        appear: ""
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [$props.open && $props.event ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("aside", {
            key: 0,
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-drawer", {
              'nc-drawer-mobile': $options.isMobile,
              'nc-drawer-right': !$options.isMobile
            }]),
            role: "dialog",
            "aria-modal": "true"
          }, [$options.isMobile ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
            key: 0,
            "class": "nc-drawer-grip",
            onClick: _cache[0] || (_cache[0] = function ($event) {
              return _ctx.$emit('close');
            })
          })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("header", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h2", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.client_name || '—'), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
            "class": "nc-status-pill",
            style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.statusPillStyle)
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.statusLabel), 5 /* TEXT, STYLE */)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-drawer-close",
            "aria-label": "Închide",
            onClick: _cache[1] || (_cache[1] = function ($event) {
              return _ctx.$emit('close');
            })
          }, "×")]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [$props.event.reference ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_4, [_cache[16] || (_cache[16] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Cod", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.reference), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [_cache[17] || (_cache[17] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Când", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-field-value nc-when", {
              'nc-when-toggleable': $options.relativeAvailable
            }]),
            onClick: _cache[2] || (_cache[2] = function () {
              return $options.onToggleWhen && $options.onToggleWhen.apply($options, arguments);
            })
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.whenDisplay), 3 /* TEXT, CLASS */)]), $props.event.service_name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_7, [_cache[18] || (_cache[18] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Serviciu", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)((0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.service_name), 1 /* TEXT */), $props.event.duration_minutes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_9, " · " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.duration_minutes) + " min", 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.event.staff_name ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_10, [_cache[19] || (_cache[19] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Personal", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.staff_name), 1 /* TEXT */)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [_cache[20] || (_cache[20] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Client", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.client_name || '—'), 1 /* TEXT */), $props.event.client_email ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
            key: 0,
            href: "mailto:".concat($props.event.client_email),
            "class": "nc-link"
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.client_email), 9 /* TEXT, PROPS */, _hoisted_14)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $props.event.client_phone ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("a", {
            key: 1,
            href: "tel:".concat($props.event.client_phone),
            "class": "nc-link"
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.client_phone), 9 /* TEXT, PROPS */, _hoisted_15)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_16, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [_cache[21] || (_cache[21] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Notițe", -1 /* CACHED */)), !$data.editingNotes && $props.event.notes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
            key: 0,
            type: "button",
            "class": "nc-icon-btn",
            "aria-label": "Editează notițe",
            onClick: _cache[3] || (_cache[3] = function () {
              return $options.startEditingNotes && $options.startEditingNotes.apply($options, arguments);
            })
          }, "✎")) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), !$data.editingNotes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [$props.event.notes ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_19, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($props.event.notes), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
            key: 1,
            type: "button",
            "class": "nc-text-btn",
            onClick: _cache[4] || (_cache[4] = function () {
              return $options.startEditingNotes && $options.startEditingNotes.apply($options, arguments);
            })
          }, "Adaugă o notă"))])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_20, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
            "onUpdate:modelValue": _cache[5] || (_cache[5] = function ($event) {
              return $data.notesDraft = $event;
            }),
            rows: "4",
            "class": "nc-textarea"
          }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.notesDraft]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-primary",
            disabled: $props.saving,
            onClick: _cache[6] || (_cache[6] = function ($event) {
              return _ctx.$emit('save-notes', {
                notes: $data.notesDraft
              });
            })
          }, "Salvează", 8 /* PROPS */, _hoisted_22), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-ghost",
            onClick: _cache[7] || (_cache[7] = function () {
              return $options.cancelEditingNotes && $options.cancelEditingNotes.apply($options, arguments);
            })
          }, "Renunță")])]))]), $options.formResponseEntries.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_23, [_cache[22] || (_cache[22] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Răspunsuri formular", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("dl", _hoisted_24, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.formResponseEntries, function (entry) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: entry.key
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("dt", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("dd", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.value), 1 /* TEXT */)], 64 /* STABLE_FRAGMENT */);
          }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.timelineEntries.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_25, [_cache[23] || (_cache[23] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Istoric", -1 /* CACHED */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("ol", _hoisted_26, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.timelineEntries, function (entry) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("li", {
              key: entry.id,
              "class": "nc-timeline-item"
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
              "class": "nc-timeline-dot",
              style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
                backgroundColor: entry.color
              })
            }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.label), 1 /* TEXT */), entry.detail ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_29, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.detail), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
              "class": "nc-timeline-time",
              title: entry.absoluteTime
            }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(entry.displayTime), 9 /* TEXT, PROPS */, _hoisted_30)])]);
          }), 128 /* KEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), $options.actionable ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_31, [_cache[24] || (_cache[24] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
            "class": "nc-field-label"
          }, "Acțiuni", -1 /* CACHED */)), !$data.cancelling ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_32, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-primary",
            disabled: $props.saving,
            onClick: _cache[8] || (_cache[8] = function ($event) {
              return _ctx.$emit('mark-completed');
            })
          }, "Finalizează", 8 /* PROPS */, _hoisted_33), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-secondary",
            disabled: $props.saving,
            onClick: _cache[9] || (_cache[9] = function ($event) {
              return _ctx.$emit('mark-no-show');
            })
          }, "Marchează neprezentare", 8 /* PROPS */, _hoisted_34), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-danger",
            disabled: $props.saving,
            onClick: _cache[10] || (_cache[10] = function ($event) {
              return $data.cancelling = true;
            })
          }, "Anulează", 8 /* PROPS */, _hoisted_35)])) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_36, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("textarea", {
            "onUpdate:modelValue": _cache[11] || (_cache[11] = function ($event) {
              return $data.cancelReason = $event;
            }),
            rows: "3",
            "class": "nc-textarea",
            placeholder: "Motiv anulare (opțional)"
          }, null, 512 /* NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelText, $data.cancelReason]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-danger",
            disabled: $props.saving,
            onClick: _cache[12] || (_cache[12] = function ($event) {
              return _ctx.$emit('cancel-booking', {
                reason: $data.cancelReason
              });
            })
          }, "Confirmă anulare", 8 /* PROPS */, _hoisted_38), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-ghost",
            onClick: _cache[13] || (_cache[13] = function ($event) {
              $data.cancelling = false;
              $data.cancelReason = '';
            })
          }, "Înapoi")])]))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("footer", _hoisted_39, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
            type: "button",
            "class": "nc-btn nc-btn-primary nc-btn-block",
            onClick: _cache[14] || (_cache[14] = function ($event) {
              return _ctx.$emit('go-to-resource');
            })
          }, "Mergi la rezervare")])], 2 /* CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["name"])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574":
/*!*****************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574 ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "nc-day-view"
};
var _hoisted_2 = {
  "class": "nc-time-grid nc-day-grid"
};
var _hoisted_3 = {
  "class": "nc-staff-name"
};
var _hoisted_4 = {
  "class": "nc-grid-body",
  ref: "gridBody"
};
var _hoisted_5 = {
  "class": "nc-gutter-cell"
};
var _hoisted_6 = {
  key: 0,
  "class": "nc-time-label"
};
var _hoisted_7 = ["title", "onClick"];
var _hoisted_8 = {
  "class": "nc-event-time"
};
var _hoisted_9 = {
  "class": "nc-event-title"
};
var _hoisted_10 = {
  "class": "nc-event-service"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header row: time gutter + staff columns "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-grid-header",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.headerGridStyle)
  }, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-gutter-header"
  }, null, -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayStaff, function (staff) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: staff.id,
      "class": "nc-staff-header",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
        backgroundColor: staff.color + '18',
        borderBottom: '3px solid ' + staff.color
      })
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(staff.name), 1 /* TEXT */)], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Scrollable body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-grid-rows",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.bodyGridStyle)
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Time slot rows "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.timeSlots, function (slot) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: slot.time,
      "class": "nc-time-row",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.rowGridStyle)
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [slot.isHour ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_6, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slot.label), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.displayStaff, function (staff) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: staff.id + '-' + slot.time,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-grid-cell", {
          'nc-hour-border': slot.isHour
        }])
      }, null, 2 /* CLASS */);
    }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Now indicator "), $options.nowIndicatorStyle ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": "nc-now-indicator",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.nowIndicatorStyle)
  }, _toConsumableArray(_cache[1] || (_cache[1] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-now-dot"
  }, null, -1 /* CACHED */)])), 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Events overlay "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.positionedEvents, function (event) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: event.id,
      "class": "nc-grid-event",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(event.style),
      title: event.title + ' (' + event.service_name + ')',
      onClick: function onClick($event) {
        return _ctx.$emit('open-event', $event, event);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.startTime) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.endTime), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.service_name), 1 /* TEXT */)], 12 /* STYLE, PROPS */, _hoisted_7);
  }), 128 /* KEYED_FRAGMENT */))], 4 /* STYLE */)], 512 /* NEED_PATCH */)])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4":
/*!******************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4 ***!
  \******************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  "class": "nc-week-view"
};
var _hoisted_2 = {
  "class": "nc-time-grid"
};
var _hoisted_3 = {
  "class": "nc-grid-header"
};
var _hoisted_4 = {
  "class": "nc-day-name"
};
var _hoisted_5 = {
  "class": "nc-grid-body",
  ref: "gridBody"
};
var _hoisted_6 = {
  "class": "nc-grid-rows"
};
var _hoisted_7 = {
  "class": "nc-gutter-cell"
};
var _hoisted_8 = {
  key: 0,
  "class": "nc-time-label"
};
var _hoisted_9 = ["title", "onClick"];
var _hoisted_10 = {
  "class": "nc-event-time"
};
var _hoisted_11 = {
  "class": "nc-event-title"
};
var _hoisted_12 = {
  "class": "nc-event-service"
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Header row: time gutter + 7 day columns "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [_cache[0] || (_cache[0] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-gutter-header"
  }, null, -1 /* CACHED */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.days, function (day) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: day.dateStr,
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-day-header", {
        'nc-today': day.isToday
      }])
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dayName), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
      "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-day-number", {
        'nc-today-circle': day.isToday
      }])
    }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.dayNumber), 3 /* TEXT, CLASS */)], 2 /* CLASS */);
  }), 128 /* KEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Scrollable body "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_5, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_6, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Time slot rows "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.timeSlots, function (slot) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: slot.time,
      "class": "nc-time-row"
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_7, [slot.isHour ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_8, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(slot.label), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.days, function (day) {
      return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
        key: day.dateStr + '-' + slot.time,
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["nc-grid-cell", {
          'nc-today-col': day.isToday,
          'nc-hour-border': slot.isHour
        }])
      }, null, 2 /* CLASS */);
    }), 128 /* KEYED_FRAGMENT */))]);
  }), 128 /* KEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Now indicator "), $options.nowIndicatorStyle ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
    key: 0,
    "class": "nc-now-indicator",
    style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)($options.nowIndicatorStyle)
  }, _toConsumableArray(_cache[1] || (_cache[1] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", {
    "class": "nc-now-dot"
  }, null, -1 /* CACHED */)])), 4 /* STYLE */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Events overlay "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.positionedEvents, function (event) {
    return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
      key: event.id,
      "class": "nc-grid-event",
      style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(event.style),
      title: event.title + ' (' + event.service_name + ')',
      onClick: function onClick($event) {
        return _ctx.$emit('open-event', $event, event);
      }
    }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.startTime) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.endTime), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_11, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.title), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.service_name), 1 /* TEXT */)], 12 /* STYLE, PROPS */, _hoisted_9);
  }), 128 /* KEYED_FRAGMENT */))])], 512 /* NEED_PATCH */)])]);
}

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe":
/*!*********************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe ***!
  \*********************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* binding */ render)
/* harmony export */ });
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "vue");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }

var _hoisted_1 = {
  id: "nc-control"
};
var _hoisted_2 = {
  "class": "left-items"
};
var _hoisted_3 = {
  ref: "theForm",
  "class": "divide-y divide-gray-200 dark:divide-gray-800 divide-solid"
};
var _hoisted_4 = {
  "class": "p-3 text-center"
};
var _hoisted_5 = ["value"];
var _hoisted_6 = ["value"];
var _hoisted_7 = ["value"];
var _hoisted_8 = {
  "class": "text-90 font-normal text-xl md:text-2xl noselect"
};
var _hoisted_9 = {
  "class": "center-items"
};
var _hoisted_10 = {
  "class": "bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800"
};
var _hoisted_11 = ["onClick"];
var _hoisted_12 = {
  "class": "right-items"
};
var _hoisted_13 = {
  "class": "divide-y divide-gray-200 dark:divide-gray-800 divide-solid"
};
var _hoisted_14 = {
  key: 0,
  "class": "bg-gray-100"
};
var _hoisted_15 = ["onClick"];
var _hoisted_16 = ["innerHTML"];
var _hoisted_17 = {
  ref: "theForm",
  "class": "divide-y divide-gray-200 dark:divide-gray-800 divide-solid"
};
var _hoisted_18 = {
  key: 0,
  "class": "bg-gray-100"
};
var _hoisted_19 = ["innerHTML"];
var _hoisted_20 = ["innerHTML", "onClick"];
var _hoisted_21 = {
  key: 0,
  style: {
    "width": "100%",
    "overflow": "scroll"
  }
};
var _hoisted_22 = {
  key: 0,
  "class": "nova-calendar noselect"
};
var _hoisted_23 = {
  "class": "nc-header"
};
var _hoisted_24 = {
  "class": "border-gray-200 dark:border-gray-900 dark:text-gray-300"
};
var _hoisted_25 = {
  "class": "nc-content"
};
var _hoisted_26 = {
  "class": "week"
};
var _hoisted_27 = {
  "class": "dayheader text-gray-400 noselect"
};
var _hoisted_28 = {
  "class": "daylabel"
};
var _hoisted_29 = {
  "class": "badges"
};
var _hoisted_30 = {
  "class": "badge-bg text-gray-200"
};
var _hoisted_31 = ["innerHTML"];
var _hoisted_32 = ["innerHTML"];
var _hoisted_33 = {
  "class": "week-events"
};
var _hoisted_34 = ["onClick"];
var _hoisted_35 = {
  "class": "name noscrollbar"
};
var _hoisted_36 = {
  "class": "badges noscrollbar"
};
var _hoisted_37 = {
  "class": "badge-bg text-gray-200"
};
var _hoisted_38 = ["innerHTML"];
var _hoisted_39 = {
  "class": "content noscrollbar"
};
var _hoisted_40 = {
  key: 0,
  "class": "time"
};
var _hoisted_41 = ["innerHTML"];
var _hoisted_42 = ["onClick"];
var _hoisted_43 = {
  "class": "name noscrollbar"
};
var _hoisted_44 = {
  key: 0,
  "class": "badges"
};
var _hoisted_45 = {
  "class": "badge-bg text-gray-200"
};
var _hoisted_46 = ["innerHTML"];
var _hoisted_47 = {
  "class": "content noscrollbar"
};
var _hoisted_48 = {
  key: 0,
  "class": "time"
};
var _hoisted_49 = {
  key: 1,
  "class": "time"
};
var _hoisted_50 = ["innerHTML"];
var _hoisted_51 = {
  key: 1,
  style: {
    "width": "100%",
    "overflow": "auto"
  }
};
var _hoisted_52 = {
  key: 2,
  style: {
    "width": "100%",
    "overflow": "auto"
  }
};
function render(_ctx, _cache, $props, $setup, $data, $options) {
  var _this = this;
  var _component_Head = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Head");
  var _component_DropdownTrigger = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DropdownTrigger");
  var _component_ScrollWrap = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("ScrollWrap");
  var _component_DropdownMenu = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DropdownMenu");
  var _component_Dropdown = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Dropdown");
  var _component_Icon = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Icon");
  var _component_Tooltip = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Tooltip");
  var _component_Card = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("Card");
  var _component_WeekView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("WeekView");
  var _component_DayView = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("DayView");
  var _component_BookingDrawer = (0,vue__WEBPACK_IMPORTED_MODULE_0__.resolveComponent)("BookingDrawer");
  return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", null, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Head, {
    title: _ctx.$data.windowTitle || _ctx.$data.title
  }, null, 8 /* PROPS */, ["title"]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_1, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_2, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[0] || (_cache[0] = function () {
      return $options.prevPeriod && $options.prevPeriod.apply($options, arguments);
    }),
    href: "#",
    "class": "button hover:bg-gray-100 dark:hover:bg-gray-700",
    title: "Alt + ←"
  }, _toConsumableArray(_cache[11] || (_cache[11] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "class": "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M11 19l-7-7 7-7m8 14l-7-7 7-7"
  })], -1 /* CACHED */)]))), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[1] || (_cache[1] = function () {
      return $options.reset && $options.reset.apply($options, arguments);
    }),
    href: "#",
    "class": "button hover:bg-gray-100 dark:hover:bg-gray-700",
    title: "Alt + H"
  }, _toConsumableArray(_cache[12] || (_cache[12] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "class": "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("circle", {
    cx: "12",
    cy: "12",
    r: "2",
    fill: "currentColor"
  })], -1 /* CACHED */)]))), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("a", {
    onClick: _cache[2] || (_cache[2] = function () {
      return $options.nextPeriod && $options.nextPeriod.apply($options, arguments);
    }),
    href: "#",
    "class": "button hover:bg-gray-100 dark:hover:bg-gray-700",
    title: "Alt + →"
  }, _toConsumableArray(_cache[13] || (_cache[13] = [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
    xmlns: "http://www.w3.org/2000/svg",
    "class": "h-6 w-6",
    fill: "none",
    viewBox: "0 0 24 24",
    stroke: "currentColor",
    "stroke-width": "2"
  }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
    "stroke-linecap": "round",
    "stroke-linejoin": "round",
    d: "M13 5l7 7-7 7M5 5l7 7-7 7"
  })], -1 /* CACHED */)]))), $data.activeView === 'month' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Dropdown, {
    key: 0,
    "handle-internal-clicks": true,
    "class": "flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded",
    dusk: "month-picker"
  }, {
    menu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownMenu, {
        width: "220"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ScrollWrap, {
            height: 350,
            "class": "bg-white dark:bg-gray-900"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_3, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_4, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
                name: "month",
                "class": "mr-3 dark:bg-gray-900",
                "onUpdate:modelValue": _cache[3] || (_cache[3] = function ($event) {
                  return $data.month = $event;
                }),
                onChange: _cache[4] || (_cache[4] = function ($event) {
                  return $options.reload();
                }),
                onClick: _cache[5] || (_cache[5] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {}, ["stop"]))
              }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.$data.monthLabels, function (monthLabel, monthNum) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("option", {
                  value: monthNum
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(monthLabel), 9 /* TEXT, PROPS */, _hoisted_5);
              }), 256 /* UNKEYED_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.month]]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.withDirectives)((0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("select", {
                name: "year",
                "class": "dark:bg-gray-900",
                "onUpdate:modelValue": _cache[6] || (_cache[6] = function ($event) {
                  return $data.year = $event;
                }),
                onChange: _cache[7] || (_cache[7] = function ($event) {
                  return $options.reload();
                }),
                onClick: _cache[8] || (_cache[8] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.withModifiers)(function () {}, ["stop"]))
              }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(25, function (index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
                  value: $data.year + (25 - index)
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.year + (25 - index)), 9 /* TEXT, PROPS */, _hoisted_6);
              }), 64 /* STABLE_FRAGMENT */)), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(100, function (index) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("option", {
                  value: $data.year - index
                }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.year - index), 9 /* TEXT, PROPS */, _hoisted_7);
              }), 64 /* STABLE_FRAGMENT */))], 544 /* NEED_HYDRATION, NEED_PATCH */), [[vue__WEBPACK_IMPORTED_MODULE_0__.vModelSelect, $data.year]])])], 512 /* NEED_PATCH */)];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownTrigger, {
        "class": "toolbar-button px-2",
        style: {
          "padding-left": "0"
        }
      })];
    }),
    _: 1 /* STABLE */
  })) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("h1", _hoisted_8, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.displayTitle), 1 /* TEXT */)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_9, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" View switcher dropdown "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Dropdown, {
    "handle-internal-clicks": true,
    "class": "flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700",
    dusk: "view-switcher"
  }, {
    menu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownMenu, {
        width: "140"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_10, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($options.viewOptions, function (v) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
              key: v.key,
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["py-2 px-3 w-full block text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200", {
                'font-bold text-primary-500 dark:text-primary-400': $data.activeView === v.key
              }]),
              onClick: function onClick($event) {
                return $options.switchView(v.key);
              }
            }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(v.label), 11 /* TEXT, CLASS, PROPS */, _hoisted_11);
          }), 128 /* KEYED_FRAGMENT */))])];
        }),
        _: 1 /* STABLE */
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownTrigger, {
        "class": "toolbar-button px-3 text-sm"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($options.activeViewLabel), 1 /* TEXT */), _cache[14] || (_cache[14] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "class": "h-4 w-4 ml-1",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M19 9l-7 7-7-7"
          })], -1 /* CACHED */))];
        }),
        _: 1 /* STABLE */
      })];
    }),
    _: 1 /* STABLE */
  })]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_12, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Staff filter (for week/day views) "), $data.activeView !== 'month' && $data.staffList.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Dropdown, {
    key: 0,
    "handle-internal-clicks": true,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
      'bg-primary-500 hover:bg-primary-600 border-primary-500': $data.selectedStaffIds.length > 0,
      'dark:bg-primary-500 dark:hover:bg-primary-600 dark:border-primary-500': $data.selectedStaffIds.length > 0
    }, "flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mr-2"]),
    dusk: "staff-filter"
  }, {
    menu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownMenu, {
        width: "220"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ScrollWrap, {
            height: 350,
            "class": "bg-white dark:bg-gray-900"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_13, [$data.selectedStaffIds.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_14, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
                "class": "py-2 w-full block tracking-wide text-center text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none text-sm",
                onClick: _cache[9] || (_cache[9] = function ($event) {
                  $data.selectedStaffIds = [];
                  $options.loadTimeGridEvents();
                })
              }, " Toate ")])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)($data.staffList, function (staff) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
                  key: staff.id,
                  "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["py-2 px-3 w-full block dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 text-left text-sm flex items-center gap-2", {
                    'font-bold': $data.selectedStaffIds.includes(staff.id)
                  }]),
                  onClick: function onClick($event) {
                    return $options.toggleStaffFilter(staff.id);
                  }
                }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                  "class": "inline-block w-3 h-3 rounded-full flex-shrink-0",
                  style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)({
                    backgroundColor: staff.color
                  })
                }, null, 4 /* STYLE */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createTextVNode)(" " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(staff.name), 1 /* TEXT */)], 10 /* CLASS, PROPS */, _hoisted_15);
              }), 128 /* KEYED_FRAGMENT */))])])];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownTrigger, {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'text-white hover:text-white dark:text-gray-800 dark:hover:text-gray-800': $data.selectedStaffIds.length > 0
        }, "toolbar-button px-2"])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [_cache[15] || (_cache[15] = (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("svg", {
            xmlns: "http://www.w3.org/2000/svg",
            "class": "h-5 w-5",
            fill: "none",
            viewBox: "0 0 24 24",
            stroke: "currentColor",
            "stroke-width": "2"
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("path", {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
            d: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
          })], -1 /* CACHED */)), $data.selectedStaffIds.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
            key: 0,
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
              'text-white dark:text-gray-800': $data.selectedStaffIds.length > 0
            }, "ml-1 font-bold text-sm"])
          }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)($data.selectedStaffIds.length), 3 /* TEXT, CLASS */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["class"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Existing month-view filter "), $data.activeView === 'month' && Object.keys($data.availableFilters).length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createBlock)(_component_Dropdown, {
    key: 1,
    "handle-internal-clicks": true,
    "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
      'bg-primary-500 hover:bg-primary-600 border-primary-500': $data.activeFilterKey != null,
      'dark:bg-primary-500 dark:hover:bg-primary-600 dark:border-primary-500': $data.activeFilterKey != null
    }, "flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"]),
    dusk: "filter-selector"
  }, {
    menu: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownMenu, {
        width: "260"
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_ScrollWrap, {
            height: 350,
            "class": "bg-white dark:bg-gray-900"
          }, {
            "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
              return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_17, [$data.activeFilterKey != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_18, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("button", {
                "class": "py-2 w-full block tracking-wide text-center text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none",
                onClick: _cache[10] || (_cache[10] = function ($event) {
                  return $options.chooseFilter(null);
                }),
                innerHTML: _ctx.$data.resetFiltersLabel
              }, null, 8 /* PROPS */, _hoisted_19)])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.$data.availableFilters, function (filterLabel, filterKey) {
                return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("button", {
                  "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["py-2 w-full block dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200", {
                    'font-bold': $data.activeFilterKey == filterKey
                  }]),
                  innerHTML: filterLabel,
                  onClick: function onClick($event) {
                    return $options.chooseFilter(filterKey);
                  }
                }, null, 10 /* CLASS, PROPS */, _hoisted_20);
              }), 256 /* UNKEYED_FRAGMENT */))])], 512 /* NEED_PATCH */)];
            }),
            _: 1 /* STABLE */
          })];
        }),
        _: 1 /* STABLE */
      })];
    }),
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DropdownTrigger, {
        "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
          'text-white hover:text-white dark:text-gray-800 dark:hover:text-gray-800': $data.activeFilterKey != null
        }, "toolbar-button px-2"])
      }, {
        "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
          return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Icon, {
            type: "filter"
          }), $data.activeFilterKey != null ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
            key: 0,
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([{
              'text-white dark:text-gray-800': $data.activeFilterKey != null
            }, "ml-2 font-bold"]),
            innerHTML: $data.activeFilterLabel
          }, null, 10 /* CLASS, PROPS */, _hoisted_16)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
        }),
        _: 1 /* STABLE */
      }, 8 /* PROPS */, ["class"])];
    }),
    _: 1 /* STABLE */
  }, 8 /* PROPS */, ["class"])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Month view (existing) "), $data.activeView === 'month' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_21, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Card, {
    "class": "flex flex-col items-center justify-center dark:bg-gray-800",
    style: {
      "min-height": "300px",
      "min-width": "800px",
      "background-color": "var(--bg-gray-800)"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [$data.title.length ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_22, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_23, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.$data.columns, function (column) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_24, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(column), 1 /* TEXT */)]);
      }), 256 /* UNKEYED_FRAGMENT */))]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_25, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" week wrapper "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(_ctx.$data.weeks, function (week, weekIndex) {
        return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_26, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" a cell per day, background "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(week, function (day) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(["day dark:bg-gray-900 dark:border-gray-800", ['nc-col-' + day.weekdayColumn], {
              withinRange: day.isWithinRange,
              today: day.isToday
            }])
          }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_27, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", _hoisted_28, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(day.label), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_29, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(day.badges, function (badge) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_30, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Tooltip, null, {
              content: (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                  innerHTML: badge.tooltip
                }, null, 8 /* PROPS */, _hoisted_31)];
              }),
              "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
                return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                  "class": "badge",
                  innerHTML: badge.badge
                }, null, 8 /* PROPS */, _hoisted_32)];
              }),
              _: 2 /* DYNAMIC */
            }, 1024 /* DYNAMIC_SLOTS */)]);
          }), 256 /* UNKEYED_FRAGMENT */))])])], 2 /* CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" events, overlaid "), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_33, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" multi day events for all days first "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(week, function (day) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(day.eventsMultiDay, function (event) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([['nc-event', 'multi', 'nc-col-' + day.weekdayColumn, 'span-' + event.spansDaysN], {
                clickable: event.url,
                starts: event.startsEvent,
                ends: event.endsEvent,
                withinRange: event.isWithinRange
              }]),
              onClick: function onClick($event) {
                return $options.open($event, event);
              },
              style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_this.stylesForEvent(event))
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_35, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.name), 1 /* TEXT */), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_36, [event.startsEvent ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: 0
            }, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(event.badges, function (badge) {
              return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_37, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                "class": "badge",
                innerHTML: badge
              }, null, 8 /* PROPS */, _hoisted_38)]);
            }), 256 /* UNKEYED_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)]), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_39, [event.startsEvent && event.options.displayTime ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_40, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.startTime), 1 /* TEXT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), event.startsEvent ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", {
              key: 1,
              "class": "notes",
              innerHTML: event.notes
            }, null, 8 /* PROPS */, _hoisted_41)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)])], 14 /* CLASS, STYLE, PROPS */, _hoisted_34);
          }), 256 /* UNKEYED_FRAGMENT */))], 64 /* STABLE_FRAGMENT */);
        }), 256 /* UNKEYED_FRAGMENT */)), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" then all single day events "), ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(week, function (day) {
          return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
            "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)(['single-day-events', 'nc-col-' + day.weekdayColumn])
          }, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(day.eventsSingleDay, function (event) {
            return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", {
              "class": (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeClass)([['nc-event'], {
                clickable: event.url,
                starts: event.startsEvent,
                ends: event.endsEvent,
                withinRange: event.isWithinRange
              }]),
              onClick: function onClick($event) {
                return $options.open($event, event);
              },
              style: (0,vue__WEBPACK_IMPORTED_MODULE_0__.normalizeStyle)(_this.stylesForEvent(event))
            }, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_43, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.name), 1 /* TEXT */), event.badges.length > 0 ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_44, [((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, null, (0,vue__WEBPACK_IMPORTED_MODULE_0__.renderList)(event.badges, function (badge) {
              return (0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_45, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
                "class": "badge",
                innerHTML: badge
              }, null, 8 /* PROPS */, _hoisted_46)]);
            }), 256 /* UNKEYED_FRAGMENT */))])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("div", _hoisted_47, [event.options.displayTime ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)(vue__WEBPACK_IMPORTED_MODULE_0__.Fragment, {
              key: 0
            }, [event.endTime ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_48, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.startTime) + " - " + (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.endTime), 1 /* TEXT */)) : ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("span", _hoisted_49, (0,vue__WEBPACK_IMPORTED_MODULE_0__.toDisplayString)(event.startTime), 1 /* TEXT */))], 64 /* STABLE_FRAGMENT */)) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementVNode)("span", {
              "class": "notes",
              innerHTML: event.notes
            }, null, 8 /* PROPS */, _hoisted_50)])], 14 /* CLASS, STYLE, PROPS */, _hoisted_42);
          }), 256 /* UNKEYED_FRAGMENT */))], 2 /* CLASS */);
        }), 256 /* UNKEYED_FRAGMENT */))])]);
      }), 256 /* UNKEYED_FRAGMENT */))])])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true)];
    }),
    _: 1 /* STABLE */
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Week view "), $data.activeView === 'week' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_51, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Card, {
    "class": "flex flex-col dark:bg-gray-800",
    style: {
      "min-height": "300px",
      "min-width": "800px",
      "background-color": "var(--bg-gray-800)"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_WeekView, {
        events: $data.timeGridEvents,
        "week-start": $options.weekStartDate,
        "staff-list": $data.staffList,
        onOpenEvent: $options.openTimeGridEvent
      }, null, 8 /* PROPS */, ["events", "week-start", "staff-list", "onOpenEvent"])];
    }),
    _: 1 /* STABLE */
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)(" Day view "), $data.activeView === 'day' ? ((0,vue__WEBPACK_IMPORTED_MODULE_0__.openBlock)(), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createElementBlock)("div", _hoisted_52, [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_Card, {
    "class": "flex flex-col dark:bg-gray-800",
    style: {
      "min-height": "300px",
      "min-width": "800px",
      "background-color": "var(--bg-gray-800)"
    }
  }, {
    "default": (0,vue__WEBPACK_IMPORTED_MODULE_0__.withCtx)(function () {
      return [(0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_DayView, {
        events: $data.timeGridEvents,
        "current-date": $options.currentDayDate,
        "staff-list": $options.displayStaffForDay,
        onOpenEvent: $options.openTimeGridEvent
      }, null, 8 /* PROPS */, ["events", "current-date", "staff-list", "onOpenEvent"])];
    }),
    _: 1 /* STABLE */
  })])) : (0,vue__WEBPACK_IMPORTED_MODULE_0__.createCommentVNode)("v-if", true), (0,vue__WEBPACK_IMPORTED_MODULE_0__.createVNode)(_component_BookingDrawer, {
    event: $data.drawerEvent,
    open: $data.drawerOpen,
    saving: $data.drawerSaving,
    onClose: $options.closeDrawer,
    onMarkCompleted: $options.onMarkCompleted,
    onMarkNoShow: $options.onMarkNoShow,
    onCancelBooking: $options.onCancelBooking,
    onSaveNotes: $options.onSaveNotes,
    onGoToResource: $options.onGoToResource
  }, null, 8 /* PROPS */, ["event", "open", "saving", "onClose", "onMarkCompleted", "onMarkNoShow", "onCancelBooking", "onSaveNotes", "onGoToResource"])]);
}

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css":
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n.nc-drawer-backdrop[data-v-d00f8562] {\n    position: fixed;\n    inset: 0;\n    background: rgba(0, 0, 0, 0.45);\n    z-index: 1000;\n    display: flex;\n}\n.nc-drawer[data-v-d00f8562] {\n    background: var(--bg-gray-100, #fff);\n    color: var(--text-gray-800, #111827);\n    display: flex;\n    flex-direction: column;\n    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);\n    overflow: hidden;\n}\n.dark {\n    background: #1f2937;\n    color: #f3f4f6;\n}\n.nc-drawer-right[data-v-d00f8562] {\n    width: 420px;\n    max-width: 100vw;\n    height: 100vh;\n    margin-left: auto;\n}\n.nc-drawer-mobile[data-v-d00f8562] {\n    width: 100vw;\n    max-height: 85vh;\n    height: 85vh;\n    margin-top: auto;\n    border-top-left-radius: 16px;\n    border-top-right-radius: 16px;\n    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);\n}\n.nc-drawer-grip[data-v-d00f8562] {\n    width: 40px;\n    height: 4px;\n    border-radius: 2px;\n    background: rgba(156, 163, 175, 0.6);\n    margin: 8px auto 0;\n    cursor: pointer;\n}\n.nc-drawer-header[data-v-d00f8562] {\n    display: flex;\n    align-items: flex-start;\n    justify-content: space-between;\n    padding: 16px 20px 12px;\n    border-bottom: 1px solid rgba(156, 163, 175, 0.2);\n}\n.nc-drawer-title[data-v-d00f8562] {\n    display: flex;\n    flex-direction: column;\n    gap: 6px;\n    min-width: 0;\n}\n.nc-drawer-title h2[data-v-d00f8562] {\n    font-size: 18px;\n    font-weight: 600;\n    margin: 0;\n    line-height: 1.2;\n    word-break: break-word;\n}\n.nc-status-pill[data-v-d00f8562] {\n    align-self: flex-start;\n    font-size: 11px;\n    font-weight: 600;\n    padding: 2px 10px;\n    border-radius: 999px;\n    text-transform: uppercase;\n    letter-spacing: 0.03em;\n}\n.nc-drawer-close[data-v-d00f8562] {\n    background: transparent;\n    border: 0;\n    font-size: 26px;\n    line-height: 1;\n    color: inherit;\n    cursor: pointer;\n    padding: 0 4px;\n    opacity: 0.6;\n}\n.nc-drawer-close[data-v-d00f8562]:hover {\n    opacity: 1;\n}\n.nc-drawer-body[data-v-d00f8562] {\n    flex: 1 1 auto;\n    overflow-y: auto;\n    padding: 16px 20px 20px;\n    display: flex;\n    flex-direction: column;\n    gap: 14px;\n}\n.nc-field[data-v-d00f8562] {\n    display: flex;\n    flex-direction: column;\n    gap: 4px;\n}\n.nc-field-label-row[data-v-d00f8562] {\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    gap: 8px;\n}\n.nc-field-label[data-v-d00f8562] {\n    font-size: 11px;\n    text-transform: uppercase;\n    letter-spacing: 0.05em;\n    color: rgba(107, 114, 128, 0.9);\n    font-weight: 600;\n}\n.nc-field-value[data-v-d00f8562] {\n    font-size: 14px;\n    line-height: 1.4;\n}\n.nc-field-value a.nc-link[data-v-d00f8562] {\n    display: block;\n    color: rgb(59, 130, 246);\n    text-decoration: none;\n    font-size: 13px;\n    margin-top: 2px;\n}\n.nc-field-value a.nc-link[data-v-d00f8562]:hover {\n    text-decoration: underline;\n}\n.nc-reference[data-v-d00f8562] {\n    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;\n    font-size: 13px;\n}\n.nc-when-toggleable[data-v-d00f8562] {\n    cursor: pointer;\n    -webkit-text-decoration: underline dotted;\n            text-decoration: underline dotted;\n    text-underline-offset: 3px;\n}\n.nc-notes[data-v-d00f8562] {\n    white-space: pre-wrap;\n    word-break: break-word;\n}\n.nc-muted[data-v-d00f8562] {\n    color: rgba(107, 114, 128, 0.8);\n    font-style: italic;\n}\n.nc-text-btn[data-v-d00f8562] {\n    background: transparent;\n    border: 0;\n    padding: 0;\n    color: rgb(59, 130, 246);\n    font-size: 13px;\n    cursor: pointer;\n    font-family: inherit;\n}\n.nc-text-btn[data-v-d00f8562]:hover {\n    text-decoration: underline;\n}\n.nc-icon-btn[data-v-d00f8562] {\n    background: transparent;\n    border: 0;\n    cursor: pointer;\n    font-size: 14px;\n    color: rgba(107, 114, 128, 0.9);\n    padding: 2px 6px;\n    border-radius: 4px;\n}\n.nc-icon-btn[data-v-d00f8562]:hover {\n    background: rgba(156, 163, 175, 0.15);\n    color: inherit;\n}\n.nc-textarea[data-v-d00f8562] {\n    width: 100%;\n    padding: 8px 10px;\n    border: 1px solid rgba(156, 163, 175, 0.4);\n    border-radius: 6px;\n    font-size: 14px;\n    font-family: inherit;\n    background: transparent;\n    color: inherit;\n    resize: vertical;\n}\n.nc-textarea[data-v-d00f8562]:focus {\n    outline: 2px solid rgba(59, 130, 246, 0.4);\n    outline-offset: 0;\n    border-color: rgb(59, 130, 246);\n}\n.nc-inline-actions[data-v-d00f8562],\n.nc-action-buttons[data-v-d00f8562] {\n    display: flex;\n    gap: 8px;\n    flex-wrap: wrap;\n    margin-top: 8px;\n}\n.nc-btn[data-v-d00f8562] {\n    font-size: 13px;\n    font-weight: 500;\n    padding: 8px 14px;\n    border-radius: 6px;\n    border: 0;\n    cursor: pointer;\n    transition: background-color 0.15s;\n}\n.nc-btn[data-v-d00f8562]:disabled {\n    opacity: 0.55;\n    cursor: not-allowed;\n}\n.nc-btn-primary[data-v-d00f8562] {\n    background: rgb(59, 130, 246);\n    color: #fff;\n}\n.nc-btn-primary[data-v-d00f8562]:hover:not(:disabled) {\n    background: rgb(37, 99, 235);\n}\n.nc-btn-secondary[data-v-d00f8562] {\n    background: rgba(156, 163, 175, 0.25);\n    color: inherit;\n}\n.nc-btn-secondary[data-v-d00f8562]:hover:not(:disabled) {\n    background: rgba(156, 163, 175, 0.4);\n}\n.nc-btn-danger[data-v-d00f8562] {\n    background: rgb(239, 68, 68);\n    color: #fff;\n}\n.nc-btn-danger[data-v-d00f8562]:hover:not(:disabled) {\n    background: rgb(220, 38, 38);\n}\n.nc-btn-ghost[data-v-d00f8562] {\n    background: transparent;\n    color: inherit;\n    border: 1px solid rgba(156, 163, 175, 0.4);\n}\n.nc-btn-ghost[data-v-d00f8562]:hover:not(:disabled) {\n    background: rgba(156, 163, 175, 0.15);\n}\n.nc-btn-block[data-v-d00f8562] {\n    width: 100%;\n}\n.nc-form-responses[data-v-d00f8562] {\n    display: grid;\n    grid-template-columns: max-content 1fr;\n    gap: 4px 12px;\n    margin: 0;\n    font-size: 13px;\n}\n.nc-form-responses dt[data-v-d00f8562] {\n    font-weight: 500;\n    color: rgba(107, 114, 128, 0.9);\n}\n.nc-form-responses dd[data-v-d00f8562] {\n    margin: 0;\n    word-break: break-word;\n}\n.nc-timeline[data-v-d00f8562] {\n    list-style: none;\n    padding: 0;\n    margin: 0;\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n}\n.nc-timeline-item[data-v-d00f8562] {\n    display: grid;\n    grid-template-columns: 12px 1fr;\n    gap: 10px;\n    position: relative;\n}\n.nc-timeline-item + .nc-timeline-item[data-v-d00f8562]::before {\n    content: '';\n    position: absolute;\n    top: -10px;\n    left: 5px;\n    width: 2px;\n    height: 10px;\n    background: rgba(156, 163, 175, 0.3);\n}\n.nc-timeline-dot[data-v-d00f8562] {\n    width: 12px;\n    height: 12px;\n    border-radius: 50%;\n    margin-top: 4px;\n    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);\n}\n.dark {\n    box-shadow: 0 0 0 2px #1f2937;\n}\n.nc-timeline-content[data-v-d00f8562] {\n    font-size: 13px;\n    line-height: 1.35;\n}\n.nc-timeline-label[data-v-d00f8562] {\n    font-weight: 500;\n}\n.nc-timeline-detail[data-v-d00f8562] {\n    color: rgba(107, 114, 128, 0.9);\n    font-size: 12px;\n    margin-top: 1px;\n}\n.nc-timeline-time[data-v-d00f8562] {\n    color: rgba(107, 114, 128, 0.8);\n    font-size: 11px;\n    margin-top: 2px;\n}\n.nc-drawer-footer[data-v-d00f8562] {\n    padding: 14px 20px;\n    border-top: 1px solid rgba(156, 163, 175, 0.2);\n    background: rgba(249, 250, 251, 0.6);\n}\n.dark {\n    background: rgba(17, 24, 39, 0.6);\n}\n\n/* Transitions */\n.nc-drawer-fade-enter-active[data-v-d00f8562],\n.nc-drawer-fade-leave-active[data-v-d00f8562] {\n    transition: opacity 0.2s;\n}\n.nc-drawer-fade-enter-from[data-v-d00f8562],\n.nc-drawer-fade-leave-to[data-v-d00f8562] {\n    opacity: 0;\n}\n.nc-drawer-slide-right-enter-active[data-v-d00f8562],\n.nc-drawer-slide-right-leave-active[data-v-d00f8562] {\n    transition: transform 0.25s ease;\n}\n.nc-drawer-slide-right-enter-from[data-v-d00f8562],\n.nc-drawer-slide-right-leave-to[data-v-d00f8562] {\n    transform: translateX(100%);\n}\n.nc-drawer-slide-up-enter-active[data-v-d00f8562],\n.nc-drawer-slide-up-leave-active[data-v-d00f8562] {\n    transition: transform 0.25s ease;\n}\n.nc-drawer-slide-up-enter-from[data-v-d00f8562],\n.nc-drawer-slide-up-leave-to[data-v-d00f8562] {\n    transform: translateY(100%);\n}\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css":
/*!******************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css ***!
  \******************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n    /* Scoped Styles */\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_style_index_0_id_d00f8562_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_style_index_0_id_d00f8562_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_style_index_0_id_d00f8562_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css":
/*!**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css ***!
  \**********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_style_index_0_id_ef10eebe_lang_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css */ "./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_style_index_0_id_ef10eebe_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_style_index_0_id_ef10eebe_lang_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/vue-loader/dist/exportHelper.js":
/*!******************************************************!*\
  !*** ./node_modules/vue-loader/dist/exportHelper.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
// runtime helper for setting properties on components
// in a tree-shakable way
exports["default"] = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
        target[key] = val;
    }
    return target;
};


/***/ }),

/***/ "./resources/css/tool.css":
/*!********************************!*\
  !*** ./resources/css/tool.css ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }),

/***/ "./resources/js/components/BookingDrawer.vue":
/*!***************************************************!*\
  !*** ./resources/js/components/BookingDrawer.vue ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _BookingDrawer_vue_vue_type_template_id_d00f8562_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true */ "./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true");
/* harmony import */ var _BookingDrawer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./BookingDrawer.vue?vue&type=script&lang=js */ "./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js");
/* harmony import */ var _BookingDrawer_vue_vue_type_style_index_0_id_d00f8562_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css */ "./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css");
/* harmony import */ var _Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_BookingDrawer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_BookingDrawer_vue_vue_type_template_id_d00f8562_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render],['__scopeId',"data-v-d00f8562"],['__file',"resources/js/components/BookingDrawer.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js":
/*!***************************************************************************!*\
  !*** ./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookingDrawer.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css":
/*!***********************************************************************************************************!*\
  !*** ./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css ***!
  \***********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_style_index_0_id_d00f8562_scoped_true_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=style&index=0&id=d00f8562&scoped=true&lang=css");


/***/ }),

/***/ "./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true":
/*!*********************************************************************************************!*\
  !*** ./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_template_id_d00f8562_scoped_true__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_BookingDrawer_vue_vue_type_template_id_d00f8562_scoped_true__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/BookingDrawer.vue?vue&type=template&id=d00f8562&scoped=true");


/***/ }),

/***/ "./resources/js/components/DayView.vue":
/*!*********************************************!*\
  !*** ./resources/js/components/DayView.vue ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _DayView_vue_vue_type_template_id_1fbdd574__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DayView.vue?vue&type=template&id=1fbdd574 */ "./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574");
/* harmony import */ var _DayView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DayView.vue?vue&type=script&lang=js */ "./resources/js/components/DayView.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_DayView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_DayView_vue_vue_type_template_id_1fbdd574__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/DayView.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/DayView.vue?vue&type=script&lang=js":
/*!*********************************************************************!*\
  !*** ./resources/js/components/DayView.vue?vue&type=script&lang=js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DayView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DayView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DayView.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574":
/*!***************************************************************************!*\
  !*** ./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574 ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DayView_vue_vue_type_template_id_1fbdd574__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_DayView_vue_vue_type_template_id_1fbdd574__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./DayView.vue?vue&type=template&id=1fbdd574 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/DayView.vue?vue&type=template&id=1fbdd574");


/***/ }),

/***/ "./resources/js/components/WeekView.vue":
/*!**********************************************!*\
  !*** ./resources/js/components/WeekView.vue ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _WeekView_vue_vue_type_template_id_10b345a4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./WeekView.vue?vue&type=template&id=10b345a4 */ "./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4");
/* harmony import */ var _WeekView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./WeekView.vue?vue&type=script&lang=js */ "./resources/js/components/WeekView.vue?vue&type=script&lang=js");
/* harmony import */ var _Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;
const __exports__ = /*#__PURE__*/(0,_Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_2__["default"])(_WeekView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_WeekView_vue_vue_type_template_id_10b345a4__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/components/WeekView.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/components/WeekView.vue?vue&type=script&lang=js":
/*!**********************************************************************!*\
  !*** ./resources/js/components/WeekView.vue?vue&type=script&lang=js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WeekView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WeekView_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WeekView.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4":
/*!****************************************************************************!*\
  !*** ./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4 ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WeekView_vue_vue_type_template_id_10b345a4__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_WeekView_vue_vue_type_template_id_10b345a4__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./WeekView.vue?vue&type=template&id=10b345a4 */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/components/WeekView.vue?vue&type=template&id=10b345a4");


/***/ }),

/***/ "./resources/js/pages/Tool.vue":
/*!*************************************!*\
  !*** ./resources/js/pages/Tool.vue ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Tool.vue?vue&type=template&id=ef10eebe */ "./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe");
/* harmony import */ var _Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Tool.vue?vue&type=script&lang=js */ "./resources/js/pages/Tool.vue?vue&type=script&lang=js");
/* harmony import */ var _Tool_vue_vue_type_style_index_0_id_ef10eebe_lang_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css */ "./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css");
/* harmony import */ var _Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./node_modules/vue-loader/dist/exportHelper.js */ "./node_modules/vue-loader/dist/exportHelper.js");




;


const __exports__ = /*#__PURE__*/(0,_Users_donkfather_work_projects_nova_calendar_node_modules_vue_loader_dist_exportHelper_js__WEBPACK_IMPORTED_MODULE_3__["default"])(_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_1__["default"], [['render',_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__.render],['__file',"resources/js/pages/Tool.vue"]])
/* hot reload */
if (false) {}


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (__exports__);

/***/ }),

/***/ "./resources/js/pages/Tool.vue?vue&type=script&lang=js":
/*!*************************************************************!*\
  !*** ./resources/js/pages/Tool.vue?vue&type=script&lang=js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_script_lang_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=script&lang=js */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=script&lang=js");
 

/***/ }),

/***/ "./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css":
/*!*********************************************************************************!*\
  !*** ./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _node_modules_style_loader_dist_cjs_js_node_modules_css_loader_dist_cjs_js_clonedRuleSet_9_use_1_node_modules_vue_loader_dist_stylePostLoader_js_node_modules_postcss_loader_dist_cjs_js_clonedRuleSet_9_use_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_style_index_0_id_ef10eebe_lang_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/style-loader/dist/cjs.js!../../../node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!../../../node_modules/vue-loader/dist/stylePostLoader.js!../../../node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css */ "./node_modules/style-loader/dist/cjs.js!./node_modules/css-loader/dist/cjs.js??clonedRuleSet-9.use[1]!./node_modules/vue-loader/dist/stylePostLoader.js!./node_modules/postcss-loader/dist/cjs.js??clonedRuleSet-9.use[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=style&index=0&id=ef10eebe&lang=css");


/***/ }),

/***/ "./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe":
/*!*******************************************************************!*\
  !*** ./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   render: () => (/* reexport safe */ _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__.render)
/* harmony export */ });
/* harmony import */ var _node_modules_babel_loader_lib_index_js_clonedRuleSet_5_use_0_node_modules_vue_loader_dist_templateLoader_js_ruleSet_1_rules_2_node_modules_vue_loader_dist_index_js_ruleSet_0_use_0_Tool_vue_vue_type_template_id_ef10eebe__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! -!../../../node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!../../../node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!../../../node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./Tool.vue?vue&type=template&id=ef10eebe */ "./node_modules/babel-loader/lib/index.js??clonedRuleSet-5.use[0]!./node_modules/vue-loader/dist/templateLoader.js??ruleSet[1].rules[2]!./node_modules/vue-loader/dist/index.js??ruleSet[0].use[0]!./resources/js/pages/Tool.vue?vue&type=template&id=ef10eebe");


/***/ }),

/***/ "./resources/js/tool.js":
/*!******************************!*\
  !*** ./resources/js/tool.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _pages_Tool__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pages/Tool */ "./resources/js/pages/Tool.vue");

Nova.booting(function (app, store) {
  Nova.inertia("NovaCalendar", _pages_Tool__WEBPACK_IMPORTED_MODULE_0__["default"]);
});

/***/ }),

/***/ "vue":
/*!**********************!*\
  !*** external "Vue" ***!
  \**********************/
/***/ ((module) => {

module.exports = Vue;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/js/tool": 0,
/******/ 			"css/tool": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkmarshmallow_nova_calendar"] = self["webpackChunkmarshmallow_nova_calendar"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["css/tool"], () => (__webpack_require__("./resources/js/tool.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["css/tool"], () => (__webpack_require__("./resources/css/tool.css")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;