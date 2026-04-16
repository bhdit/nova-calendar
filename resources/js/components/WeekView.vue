<template>
    <div class="nc-week-view">
        <div class="nc-time-grid">
            <!-- Header row: time gutter + 7 day columns -->
            <div class="nc-grid-header">
                <div class="nc-gutter-header"></div>
                <div
                    v-for="day in days"
                    :key="day.dateStr"
                    class="nc-day-header"
                    :class="{ 'nc-today': day.isToday }"
                >
                    <span class="nc-day-name">{{ day.dayName }}</span>
                    <span class="nc-day-number">{{ day.dayNumber }}</span>
                </div>
            </div>

            <!-- Scrollable body -->
            <div class="nc-grid-body" ref="gridBody">
                <div class="nc-grid-rows">
                    <!-- Time slot rows -->
                    <div
                        v-for="slot in timeSlots"
                        :key="slot.time"
                        class="nc-time-row"
                    >
                        <div class="nc-gutter-cell">
                            <span v-if="slot.isHour" class="nc-time-label">{{ slot.label }}</span>
                        </div>
                        <div
                            v-for="day in days"
                            :key="day.dateStr + '-' + slot.time"
                            class="nc-grid-cell"
                            :class="{
                                'nc-today': day.isToday,
                                'nc-hour-border': slot.isHour,
                            }"
                        ></div>
                    </div>

                    <!-- Events overlay -->
                    <div
                        v-for="event in positionedEvents"
                        :key="event.id"
                        class="nc-grid-event"
                        :style="event.style"
                        :title="event.title + ' (' + event.service_name + ')'"
                        @click="$emit('open-event', event)"
                    >
                        <div class="nc-event-time">{{ event.startTime }} - {{ event.endTime }}</div>
                        <div class="nc-event-title">{{ event.title }}</div>
                        <div class="nc-event-service">{{ event.service_name }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'WeekView',

    props: {
        events: {
            type: Array,
            default: () => [],
        },
        weekStart: {
            type: String,
            required: true,
        },
        staffList: {
            type: Array,
            default: () => [],
        },
    },

    emits: ['open-event'],

    data() {
        return {
            startHour: 7,
            endHour: 22,
        };
    },

    mounted() {
        this.$nextTick(() => {
            if (this.$refs.gridBody) {
                this.$refs.gridBody.scrollTop = 0;
            }
        });
    },

    computed: {
        days() {
            const start = new Date(this.weekStart + 'T00:00:00');
            const result = [];
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const dayNames = ['Dum', 'Lun', 'Mar', 'Mie', 'Joi', 'Vin', 'Sam'];

            for (let i = 0; i < 7; i++) {
                const d = new Date(start);
                d.setDate(d.getDate() + i);
                const dateStr = this.formatDate(d);
                result.push({
                    dateStr,
                    dayName: dayNames[d.getDay()],
                    dayNumber: d.getDate(),
                    isToday: d.getTime() === today.getTime(),
                    index: i,
                });
            }
            return result;
        },

        timeSlots() {
            const slots = [];
            for (let h = this.startHour; h <= this.endHour; h++) {
                slots.push({
                    time: `${String(h).padStart(2, '0')}:00`,
                    label: `${String(h).padStart(2, '0')}:00`,
                    isHour: true,
                    minutes: h * 60,
                });
                if (h < this.endHour) {
                    slots.push({
                        time: `${String(h).padStart(2, '0')}:30`,
                        label: '',
                        isHour: false,
                        minutes: h * 60 + 30,
                    });
                }
            }
            return slots;
        },

        totalMinutes() {
            return (this.endHour - this.startHour) * 60;
        },

        positionedEvents() {
            const ROW_HEIGHT = 30; // px per 30-min slot
            const HEADER_HEIGHT = 0;
            const GUTTER_WIDTH_PERCENT = 100 / 8; // approx, we use CSS grid
            const COL_WIDTH_PERCENT = 100 / 8;

            return this.events.map((event) => {
                const eventStart = new Date(event.start);
                const eventEnd = new Date(event.end);
                const eventDateStr = this.formatDate(eventStart);

                const dayIndex = this.days.findIndex((d) => d.dateStr === eventDateStr);
                if (dayIndex === -1) return null;

                const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
                const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

                const clampedStart = Math.max(startMinutes, this.startHour * 60);
                const clampedEnd = Math.min(endMinutes, this.endHour * 60);
                if (clampedEnd <= clampedStart) return null;

                const topSlots = (clampedStart - this.startHour * 60) / 30;
                const heightSlots = (clampedEnd - clampedStart) / 30;

                const staffColor = this.getStaffColor(event.staff_id);

                const startTimeStr = `${String(eventStart.getHours()).padStart(2, '0')}:${String(eventStart.getMinutes()).padStart(2, '0')}`;
                const endTimeStr = `${String(eventEnd.getHours()).padStart(2, '0')}:${String(eventEnd.getMinutes()).padStart(2, '0')}`;

                return {
                    ...event,
                    startTime: startTimeStr,
                    endTime: endTimeStr,
                    style: {
                        position: 'absolute',
                        top: `${topSlots * ROW_HEIGHT}px`,
                        height: `${heightSlots * ROW_HEIGHT - 2}px`,
                        left: `calc(${(dayIndex + 1)} * (100% / 8) + 2px)`,
                        width: `calc(100% / 8 - 4px)`,
                        backgroundColor: staffColor,
                        color: '#fff',
                        borderRadius: '4px',
                        padding: '2px 4px',
                        fontSize: '11px',
                        overflow: 'hidden',
                        cursor: 'pointer',
                        zIndex: 10,
                        borderLeft: `3px solid ${this.darkenColor(staffColor, 30)}`,
                    },
                };
            }).filter(Boolean);
        },
    },

    methods: {
        formatDate(d) {
            const y = d.getFullYear();
            const m = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            return `${y}-${m}-${day}`;
        },

        getStaffColor(staffId) {
            const staff = this.staffList.find((s) => s.id === staffId);
            return staff ? staff.color : '#4299e1';
        },

        darkenColor(hex, amount) {
            let color = hex.replace('#', '');
            if (color.length === 3) {
                color = color[0] + color[0] + color[1] + color[1] + color[2] + color[2];
            }
            const num = parseInt(color, 16);
            let r = Math.max(0, (num >> 16) - amount);
            let g = Math.max(0, ((num >> 8) & 0x00ff) - amount);
            let b = Math.max(0, (num & 0x0000ff) - amount);
            return `#${(r << 16 | g << 8 | b).toString(16).padStart(6, '0')}`;
        },
    },
};
</script>
