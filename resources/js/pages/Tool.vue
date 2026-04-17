<template>
    <div>
        <Head :title="$data.windowTitle || $data.title" />

        <div id="nc-control">
            <div class="left-items">
                <a
                    @click="prevPeriod"
                    href="#"
                    class="button hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Alt + ←"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M11 19l-7-7 7-7m8 14l-7-7 7-7"
                        />
                    </svg>
                </a>

                <a
                    @click="reset"
                    href="#"
                    class="button hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Alt + H"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <circle cx="12" cy="12" r="2" fill="currentColor" />
                    </svg>
                </a>

                <a
                    @click="nextPeriod"
                    href="#"
                    class="button hover:bg-gray-100 dark:hover:bg-gray-700"
                    title="Alt + →"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        class="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        stroke-width="2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M13 5l7 7-7 7M5 5l7 7-7 7"
                        />
                    </svg>
                </a>

                <Dropdown
                    v-if="activeView === 'month'"
                    :handle-internal-clicks="true"
                    class="flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    dusk="month-picker"
                >
                    <DropdownTrigger
                        class="toolbar-button px-2"
                        style="padding-left: 0"
                    >
                    </DropdownTrigger>

                    <template #menu>
                        <DropdownMenu width="220">
                            <ScrollWrap
                                :height="350"
                                class="bg-white dark:bg-gray-900"
                            >
                                <div
                                    ref="theForm"
                                    class="divide-y divide-gray-200 dark:divide-gray-800 divide-solid"
                                >
                                    <div class="p-3 text-center">
                                        <select
                                            name="month"
                                            class="mr-3 dark:bg-gray-900"
                                            v-model="month"
                                            @change="reload()"
                                            @click.stop
                                        >
                                            <option
                                                v-for="(
                                                    monthLabel, monthNum
                                                ) in $data.monthLabels"
                                                :value="monthNum"
                                            >
                                                {{ monthLabel }}
                                            </option>
                                        </select>

                                        <select
                                            name="year"
                                            class="dark:bg-gray-900"
                                            v-model="year"
                                            @change="reload()"
                                            @click.stop
                                        >
                                            <template v-for="index in 25">
                                                <option
                                                    :value="year + (25 - index)"
                                                >
                                                    {{ year + (25 - index) }}
                                                </option>
                                            </template>
                                            <template v-for="index in 100">
                                                <option :value="year - index">
                                                    {{ year - index }}
                                                </option>
                                            </template>
                                        </select>
                                    </div>
                                </div>
                            </ScrollWrap>
                        </DropdownMenu>
                    </template>
                </Dropdown>

                <h1 class="text-90 font-normal text-xl md:text-2xl noselect">
                    <span>{{ displayTitle }}</span>
                </h1>
            </div>

            <div class="center-items">
                <!-- View switcher dropdown -->
                <Dropdown
                    :handle-internal-clicks="true"
                    class="flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded border border-gray-200 dark:border-gray-700"
                    dusk="view-switcher"
                >
                    <DropdownTrigger class="toolbar-button px-3 text-sm">
                        <span>{{ activeViewLabel }}</span>
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                        </svg>
                    </DropdownTrigger>
                    <template #menu>
                        <DropdownMenu width="140">
                            <div class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                <button
                                    v-for="v in viewOptions"
                                    :key="v.key"
                                    class="py-2 px-3 w-full block text-left text-sm hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-gray-200"
                                    :class="{ 'font-bold text-primary-500 dark:text-primary-400': activeView === v.key }"
                                    @click="switchView(v.key)"
                                >
                                    {{ v.label }}
                                </button>
                            </div>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>

            <div class="right-items">
                <!-- Staff filter (for week/day views) -->
                <Dropdown
                    v-if="activeView !== 'month' && staffList.length > 0"
                    :handle-internal-clicks="true"
                    :class="{
                        'bg-primary-500 hover:bg-primary-600 border-primary-500': selectedStaffIds.length > 0,
                        'dark:bg-primary-500 dark:hover:bg-primary-600 dark:border-primary-500': selectedStaffIds.length > 0,
                    }"
                    class="flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded mr-2"
                    dusk="staff-filter"
                >
                    <DropdownTrigger
                        :class="{
                            'text-white hover:text-white dark:text-gray-800 dark:hover:text-gray-800': selectedStaffIds.length > 0,
                        }"
                        class="toolbar-button px-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <span
                            v-if="selectedStaffIds.length > 0"
                            :class="{ 'text-white dark:text-gray-800': selectedStaffIds.length > 0 }"
                            class="ml-1 font-bold text-sm"
                        >
                            {{ selectedStaffIds.length }}
                        </span>
                    </DropdownTrigger>

                    <template #menu>
                        <DropdownMenu width="220">
                            <ScrollWrap
                                :height="350"
                                class="bg-white dark:bg-gray-900"
                            >
                                <div class="divide-y divide-gray-200 dark:divide-gray-800 divide-solid">
                                    <div v-if="selectedStaffIds.length > 0" class="bg-gray-100">
                                        <button
                                            class="py-2 w-full block tracking-wide text-center text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none text-sm"
                                            @click="selectedStaffIds = []; loadTimeGridEvents();"
                                        >
                                            Toate
                                        </button>
                                    </div>
                                    <div>
                                        <button
                                            v-for="staff in staffList"
                                            :key="staff.id"
                                            class="py-2 px-3 w-full block dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200 text-left text-sm flex items-center gap-2"
                                            :class="{ 'font-bold': selectedStaffIds.includes(staff.id) }"
                                            @click="toggleStaffFilter(staff.id)"
                                        >
                                            <span
                                                class="inline-block w-3 h-3 rounded-full flex-shrink-0"
                                                :style="{ backgroundColor: staff.color }"
                                            ></span>
                                            {{ staff.name }}
                                        </button>
                                    </div>
                                </div>
                            </ScrollWrap>
                        </DropdownMenu>
                    </template>
                </Dropdown>

                <!-- Existing month-view filter -->
                <Dropdown
                    v-if="activeView === 'month' && Object.keys(availableFilters).length"
                    :handle-internal-clicks="true"
                    :class="{
                        'bg-primary-500 hover:bg-primary-600 border-primary-500':
                            activeFilterKey != null,
                        'dark:bg-primary-500 dark:hover:bg-primary-600 dark:border-primary-500':
                            activeFilterKey != null,
                    }"
                    class="flex h-9 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
                    dusk="filter-selector"
                >
                    <DropdownTrigger
                        :class="{
                            'text-white hover:text-white dark:text-gray-800 dark:hover:text-gray-800':
                                activeFilterKey != null,
                        }"
                        class="toolbar-button px-2"
                    >
                        <Icon type="filter" />
                        <span
                            v-if="activeFilterKey != null"
                            :class="{
                                'text-white dark:text-gray-800':
                                    activeFilterKey != null,
                            }"
                            class="ml-2 font-bold"
                            v-html="activeFilterLabel"
                        >
                        </span>
                    </DropdownTrigger>

                    <template #menu>
                        <DropdownMenu width="260">
                            <ScrollWrap
                                :height="350"
                                class="bg-white dark:bg-gray-900"
                            >
                                <div
                                    ref="theForm"
                                    class="divide-y divide-gray-200 dark:divide-gray-800 divide-solid"
                                >
                                    <div
                                        v-if="activeFilterKey != null"
                                        class="bg-gray-100"
                                    >
                                        <button
                                            class="py-2 w-full block tracking-wide text-center text-gray-500 dark:bg-gray-800 dark:hover:bg-gray-700 focus:outline-none"
                                            @click="chooseFilter(null)"
                                            v-html="$data.resetFiltersLabel"
                                        ></button>
                                    </div>

                                    <div>
                                        <template
                                            v-for="(
                                                filterLabel, filterKey
                                            ) in $data.availableFilters"
                                        >
                                            <button
                                                class="py-2 w-full block dark:bg-gray-800 dark:hover:bg-gray-700 hover:bg-gray-200"
                                                :class="{
                                                    'font-bold':
                                                        activeFilterKey ==
                                                        filterKey,
                                                }"
                                                v-html="filterLabel"
                                                @click="chooseFilter(filterKey)"
                                            ></button>
                                        </template>
                                    </div>
                                </div>
                            </ScrollWrap>
                        </DropdownMenu>
                    </template>
                </Dropdown>
            </div>
        </div>

        <!-- Month view (existing) -->
        <div v-if="activeView === 'month'" style="width: 100%; overflow: scroll">
            <Card
                class="flex flex-col items-center justify-center dark:bg-gray-800"
                style="
                    min-height: 300px;
                    min-width: 800px;
                    background-color: var(--bg-gray-800);
                "
            >
                <div class="nova-calendar noselect" v-if="title.length">
                    <div class="nc-header">
                        <div
                            v-for="column in $data.columns"
                            class="border-gray-200 dark:border-gray-900 dark:text-gray-300"
                        >
                            <span>{{ column }}</span>
                        </div>
                    </div>

                    <div class="nc-content">
                        <!-- week wrapper -->
                        <div
                            v-for="(week, weekIndex) in $data.weeks"
                            class="week"
                        >
                            <!-- a cell per day, background -->
                            <template v-for="day in week">
                                <div
                                    class="day dark:bg-gray-900 dark:border-gray-800"
                                    :class="['nc-col-' + day.weekdayColumn]"
                                    v-bind:class="{
                                        withinRange: day.isWithinRange,
                                        today: day.isToday,
                                    }"
                                >
                                    <div
                                        class="dayheader text-gray-400 noselect"
                                    >
                                        <span class="daylabel">{{
                                            day.label
                                        }}</span>
                                        <div class="badges">
                                            <span
                                                class="badge-bg text-gray-200"
                                                v-for="badge in day.badges"
                                            >
                                                <Tooltip
                                                    ><template #content
                                                        ><span
                                                            v-html="
                                                                badge.tooltip
                                                            "
                                                        ></span
                                                    ></template>
                                                    <span
                                                        class="badge"
                                                        v-html="badge.badge"
                                                    ></span>
                                                </Tooltip>
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </template>

                            <!-- events, overlaid -->
                            <div class="week-events">
                                <!-- multi day events for all days first -->
                                <template v-for="day in week">
                                    <template
                                        v-for="event in day.eventsMultiDay"
                                    >
                                        <div
                                            :class="[
                                                'nc-event',
                                                'multi',
                                                'nc-col-' + day.weekdayColumn,
                                                'span-' + event.spansDaysN,
                                            ]"
                                            @click="open($event, event)"
                                            :style="this.stylesForEvent(event)"
                                            v-bind:class="{
                                                clickable: event.url,
                                                starts: event.startsEvent,
                                                ends: event.endsEvent,
                                                withinRange:
                                                    event.isWithinRange,
                                            }"
                                        >
                                            <div class="name noscrollbar">
                                                {{ event.name }}
                                            </div>
                                            <div class="badges noscrollbar">
                                                <span
                                                    v-if="event.startsEvent"
                                                    class="badge-bg text-gray-200"
                                                    v-for="badge in event.badges"
                                                    ><span
                                                        class="badge"
                                                        v-html="badge"
                                                    ></span
                                                ></span>
                                            </div>
                                            <div class="content noscrollbar">
                                                <template
                                                    v-if="
                                                        event.startsEvent &&
                                                        event.options
                                                            .displayTime
                                                    "
                                                >
                                                    <span class="time">{{
                                                        event.startTime
                                                    }}</span>
                                                </template>
                                                <span
                                                    v-if="event.startsEvent"
                                                    class="notes"
                                                    v-html="event.notes"
                                                ></span>
                                            </div>
                                        </div>
                                    </template>
                                </template>

                                <!-- then all single day events -->
                                <template v-for="day in week">
                                    <div
                                        :class="[
                                            'single-day-events',
                                            'nc-col-' + day.weekdayColumn,
                                        ]"
                                    >
                                        <template
                                            v-for="event in day.eventsSingleDay"
                                        >
                                            <div
                                                :class="['nc-event']"
                                                @click="open($event, event)"
                                                :style="
                                                    this.stylesForEvent(event)
                                                "
                                                v-bind:class="{
                                                    clickable: event.url,
                                                    starts: event.startsEvent,
                                                    ends: event.endsEvent,
                                                    withinRange:
                                                        event.isWithinRange,
                                                }"
                                            >
                                                <div class="name noscrollbar">
                                                    {{ event.name }}
                                                </div>
                                                <div
                                                    class="badges"
                                                    v-if="
                                                        event.badges.length > 0
                                                    "
                                                >
                                                    <span
                                                        class="badge-bg text-gray-200"
                                                        v-for="badge in event.badges"
                                                        ><span
                                                            class="badge"
                                                            v-html="badge"
                                                        ></span
                                                    ></span>
                                                </div>
                                                <div
                                                    class="content noscrollbar"
                                                >
                                                    <template
                                                        v-if="
                                                            event.options
                                                                .displayTime
                                                        "
                                                    >
                                                        <span
                                                            class="time"
                                                            v-if="event.endTime"
                                                            >{{
                                                                event.startTime
                                                            }}
                                                            -
                                                            {{
                                                                event.endTime
                                                            }}</span
                                                        >
                                                        <span
                                                            class="time"
                                                            v-else
                                                            >{{
                                                                event.startTime
                                                            }}</span
                                                        >
                                                    </template>
                                                    <span
                                                        class="notes"
                                                        v-html="event.notes"
                                                    ></span>
                                                </div>
                                            </div>
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>

        <!-- Week view -->
        <div v-if="activeView === 'week'" style="width: 100%; overflow: auto">
            <Card
                class="flex flex-col dark:bg-gray-800"
                style="min-height: 300px; min-width: 800px; background-color: var(--bg-gray-800);"
            >
                <WeekView
                    :events="timeGridEvents"
                    :week-start="weekStartDate"
                    :staff-list="staffList"
                    @open-event="openTimeGridEvent"
                />
            </Card>
        </div>

        <!-- Day view -->
        <div v-if="activeView === 'day'" style="width: 100%; overflow: auto">
            <Card
                class="flex flex-col dark:bg-gray-800"
                style="min-height: 300px; min-width: 800px; background-color: var(--bg-gray-800);"
            >
                <DayView
                    :events="timeGridEvents"
                    :current-date="currentDayDate"
                    :staff-list="displayStaffForDay"
                    @open-event="openTimeGridEvent"
                />
            </Card>
        </div>

        <BookingDrawer
            :event="drawerEvent"
            :open="drawerOpen"
            :saving="drawerSaving"
            @close="closeDrawer"
            @mark-completed="onMarkCompleted"
            @mark-no-show="onMarkNoShow"
            @cancel-booking="onCancelBooking"
            @save-notes="onSaveNotes"
            @go-to-resource="onGoToResource"
        />
    </div>
</template>

<script>
    import WeekView from "../components/WeekView.vue";
    import DayView from "../components/DayView.vue";
    import BookingDrawer from "../components/BookingDrawer.vue";

    export default {
        components: {
            WeekView,
            DayView,
            BookingDrawer,
        },

        mounted() {
            this.init();

            Nova.addShortcut("alt+right", (event) => {
                this.nextPeriod();
            });
            Nova.addShortcut("alt+left", (event) => {
                this.prevPeriod();
            });
            Nova.addShortcut("alt+h", (event) => {
                this.reset();
            });
        },

        methods: {
            reset() {
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

            init() {
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

            switchView(view) {
                this.activeView = view;
                this.storeSettings();
                if (view === 'month') {
                    this.reload();
                } else {
                    this.loadTimeGridEvents();
                }
            },

            prevPeriod() {
                if (this.activeView === 'month') {
                    this.month -= 1;
                    this.reload();
                } else if (this.activeView === 'week') {
                    const d = new Date(this.currentWeekStart);
                    d.setDate(d.getDate() - 7);
                    this.currentWeekStart = d;
                    this.loadTimeGridEvents();
                } else if (this.activeView === 'day') {
                    const d = new Date(this.currentDay);
                    d.setDate(d.getDate() - 1);
                    this.currentDay = d;
                    this.loadTimeGridEvents();
                }
            },

            nextPeriod() {
                if (this.activeView === 'month') {
                    this.month += 1;
                    this.reload();
                } else if (this.activeView === 'week') {
                    const d = new Date(this.currentWeekStart);
                    d.setDate(d.getDate() + 7);
                    this.currentWeekStart = d;
                    this.loadTimeGridEvents();
                } else if (this.activeView === 'day') {
                    const d = new Date(this.currentDay);
                    d.setDate(d.getDate() + 1);
                    this.currentDay = d;
                    this.loadTimeGridEvents();
                }
            },

            reload(isInitRequest = false) {
                let vue = this;
                vue.loading = true;

                let apiUrl =
                    "/nova-vendor/marshmallow/nova-calendar" +
                    this.calendarUrl() +
                    "/month?y=" +
                    vue.year +
                    "&m=" +
                    vue.month;
                if (vue.activeFilterKey) {
                    apiUrl += "&filter=" + vue.activeFilterKey;
                } else if (isInitRequest) {
                    apiUrl += "&isInitRequest=1";
                }
                Nova.request()
                    .get(apiUrl)
                    .then((response) => {
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

                        this.setFilter(vue.activeFilterKey);
                        vue.loading = false;
                        this.storeSettings();
                    });
            },

            loadStaffList() {
                Nova.request()
                    .get("/manage/calendar/resources")
                    .then((response) => {
                        this.staffList = response.data.staff || [];
                    })
                    .catch(() => {
                        this.staffList = [];
                    });
            },

            loadTimeGridEvents() {
                let startDate, endDate;

                if (this.activeView === 'week') {
                    startDate = this.formatDate(this.currentWeekStart);
                    const end = new Date(this.currentWeekStart);
                    end.setDate(end.getDate() + 6);
                    endDate = this.formatDate(end);
                } else {
                    startDate = this.formatDate(this.currentDay);
                    endDate = startDate;
                }

                let url = `/manage/calendar/events?start=${startDate}&end=${endDate}`;

                if (this.selectedStaffIds.length > 0) {
                    this.selectedStaffIds.forEach((id) => {
                        url += `&staff[]=${id}`;
                    });
                }

                this.loading = true;
                Nova.request()
                    .get(url)
                    .then((response) => {
                        this.timeGridEvents = response.data || [];
                        this.loading = false;
                        this.storeSettings();
                    })
                    .catch(() => {
                        this.timeGridEvents = [];
                        this.loading = false;
                    });
            },

            toggleStaffFilter(staffId) {
                const idx = this.selectedStaffIds.indexOf(staffId);
                if (idx === -1) {
                    this.selectedStaffIds.push(staffId);
                } else {
                    this.selectedStaffIds.splice(idx, 1);
                }
                this.loadTimeGridEvents();
            },

            openTimeGridEvent(e, event) {
                this.open(e, event);
            },

            open(e, event) {
                if (!event || !event.url) return;
                if (e && (e.metaKey || e.ctrlKey)) {
                    window.open(Nova.url(event.url));
                    return;
                }
                // Month-view events don't carry `id` directly — parse it from
                // the resource URL (format: /resources/{uriKey}/{id}).
                let normalized = event;
                if (!event.id) {
                    const match = String(event.url).match(/\/resources\/[^/]+\/(\d+)/);
                    if (match) {
                        normalized = { ...event, id: Number(match[1]) };
                    }
                }
                this.drawerEvent = normalized;
                this.drawerOpen = true;
                this.refreshDrawerEvent();
            },

            closeDrawer() {
                this.drawerOpen = false;
                this.drawerSaving = false;
            },

            refreshDrawerEvent() {
                if (!this.drawerEvent?.id) return Promise.resolve();
                return Nova.request()
                    .get(`/manage/calendar/events/${this.drawerEvent.id}`)
                    .then((response) => {
                        this.drawerEvent = response.data;
                    })
                    .catch((err) => {
                        if (err?.response?.status === 404) {
                            this.closeDrawer();
                            Nova.error("Programare indisponibilă");
                        }
                    });
            },

            refreshCurrentView() {
                if (this.activeView === "month") {
                    this.reload(false);
                } else {
                    this.loadTimeGridEvents();
                }
            },

            postStatus(status, reason = null) {
                if (!this.drawerEvent?.id) return;
                const payload = { status };
                if (reason) payload.reason = reason;
                this.drawerSaving = true;
                Nova.request()
                    .patch(
                        `/manage/calendar/events/${this.drawerEvent.id}/status`,
                        payload
                    )
                    .then(() => {
                        this.refreshCurrentView();
                        return this.refreshDrawerEvent();
                    })
                    .catch((err) => {
                        const msg =
                            err?.response?.data?.message ||
                            "Acțiunea a eșuat. Încearcă din nou.";
                        Nova.error(msg);
                    })
                    .finally(() => {
                        this.drawerSaving = false;
                    });
            },

            onMarkCompleted() {
                this.postStatus("completed");
            },

            onMarkNoShow() {
                this.postStatus("no_show");
            },

            onCancelBooking(payload) {
                this.postStatus("cancelled", payload?.reason || null);
            },

            onSaveNotes(payload) {
                if (!this.drawerEvent?.id) return;
                this.drawerSaving = true;
                Nova.request()
                    .put(`/manage/calendar/events/${this.drawerEvent.id}`, {
                        notes: payload?.notes ?? "",
                    })
                    .then(() => {
                        this.refreshCurrentView();
                        return this.refreshDrawerEvent();
                    })
                    .catch(() => {
                        Nova.error("Salvarea notițelor a eșuat.");
                    })
                    .finally(() => {
                        this.drawerSaving = false;
                    });
            },

            onGoToResource() {
                if (this.drawerEvent?.url) {
                    Nova.visit(this.drawerEvent.url);
                }
            },

            stylesForEvent(event) {
                if (event.options.styles) {
                    let out = [this.styles.default];
                    event.options.styles.forEach((style) => {
                        if (this.styles[style] === undefined) {
                            console.log(
                                "[nova-calendar] Unknown custom style name '" +
                                    style +
                                    "'; does the eventStyles method of your CalendarDataProvider define it properly?"
                            );
                        } else {
                            out.push(this.styles[style]);
                        }
                    });
                    return out;
                } else {
                    return this.styles.default;
                }
            },

            chooseFilter(filterKey) {
                this.setFilter(filterKey);
                this.reload();
            },

            setFilter(filterKey) {
                this.activeFilterKey = filterKey;
                for (var filterKey in this.availableFilters) {
                    if (this.activeFilterKey == filterKey) {
                        this.activeFilterLabel =
                            this.availableFilters[filterKey];
                    }
                }
            },

            calendarUrl() {
                const url = window.location.pathname.substring(
                    Nova.url("").length
                );
                return url.startsWith("/") ? url : "/" + url;
            },

            storageKey() {
                return "marshmallow-nova-calendar-" + this.calendarUrl();
            },

            hasStoredSettings() {
                return localStorage.getItem(this.storageKey()) !== null;
            },

            storeSettings() {
                localStorage.setItem(
                    this.storageKey(),
                    JSON.stringify({
                        year: this.year,
                        month: this.month,
                        activeFilterKey: this.activeFilterKey,
                        activeView: this.activeView,
                        selectedStaffIds: this.selectedStaffIds,
                    })
                );
            },

            restoreSettings() {
                const storedData = JSON.parse(
                    localStorage.getItem(this.storageKey())
                );
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

            getMonday(d) {
                const date = new Date(d);
                const day = date.getDay();
                const diff = date.getDate() - day + (day === 0 ? -6 : 1);
                date.setDate(diff);
                date.setHours(0, 0, 0, 0);
                return date;
            },

            formatDate(d) {
                const y = d.getFullYear();
                const m = String(d.getMonth() + 1).padStart(2, '0');
                const day = String(d.getDate()).padStart(2, '0');
                return `${y}-${m}-${day}`;
            },
        },

        computed: {
            viewOptions() {
                return [
                    { key: 'month', label: 'Lun\u0103' },
                    { key: 'week', label: 'S\u0103pt\u0103m\u00e2n\u0103' },
                    { key: 'day', label: 'Zi' },
                ];
            },

            activeViewLabel() {
                return this.viewOptions.find(v => v.key === this.activeView)?.label || '';
            },

            weekStartDate() {
                return this.formatDate(this.currentWeekStart);
            },

            currentDayDate() {
                return this.formatDate(this.currentDay);
            },

            displayTitle() {
                if (this.activeView === 'month') {
                    return this.title;
                }

                const monthShort = [
                    'ian', 'feb', 'mar', 'apr', 'mai', 'iun',
                    'iul', 'aug', 'sep', 'oct', 'noi', 'dec',
                ];

                if (this.activeView === 'week') {
                    const start = new Date(this.currentWeekStart);
                    const end = new Date(this.currentWeekStart);
                    end.setDate(end.getDate() + 6);
                    const startDay = start.getDate();
                    const endDay = end.getDate();
                    const year = end.getFullYear();

                    if (start.getMonth() === end.getMonth()) {
                        return `${startDay}\u2013${endDay} ${monthShort[start.getMonth()]} ${year}`;
                    }
                    return `${startDay} ${monthShort[start.getMonth()]} \u2013 ${endDay} ${monthShort[end.getMonth()]} ${year}`;
                }

                if (this.activeView === 'day') {
                    const d = new Date(this.currentDay);
                    const dayShort = ['dum', 'lun', 'mar', 'mie', 'joi', 'vin', 's\u00e2m'];
                    return `${dayShort[d.getDay()]}, ${d.getDate()} ${monthShort[d.getMonth()]} ${d.getFullYear()}`;
                }

                return '';
            },

            displayStaffForDay() {
                if (this.selectedStaffIds.length > 0) {
                    return this.staffList.filter((s) => this.selectedStaffIds.includes(s.id));
                }
                return this.staffList;
            },
        },

        props: {},

        data() {
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
                    default: {
                        color: "#fff",
                        "background-color":
                            "rgba(var(--colors-primary-500), 0.9)",
                    },
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
                drawerSaving: false,
            };
        },
    };
</script>

<style>
    /* Scoped Styles */
</style>
