<template>
    <div class="nc-day-view">
        <div class="nc-time-grid nc-day-grid">
            <!-- Header row: time gutter + staff columns -->
            <div class="nc-grid-header" :style="headerGridStyle">
                <div class="nc-gutter-header"></div>
                <div
                    v-for="staff in displayStaff"
                    :key="staff.id"
                    class="nc-staff-header"
                    :style="{ borderBottom: '3px solid ' + staff.color }"
                >
                    <span class="nc-staff-name">{{ staff.name }}</span>
                </div>
            </div>

            <!-- Scrollable body -->
            <div class="nc-grid-body" ref="gridBody">
                <div class="nc-grid-rows" :style="bodyGridStyle">
                    <!-- Time slot rows -->
                    <div
                        v-for="slot in timeSlots"
                        :key="slot.time"
                        class="nc-time-row"
                        :style="rowGridStyle"
                    >
                        <div class="nc-gutter-cell">
                            <span v-if="slot.isHour" class="nc-time-label">{{ slot.label }}</span>
                        </div>
                        <div
                            v-for="staff in displayStaff"
                            :key="staff.id + '-' + slot.time"
                            class="nc-grid-cell"
                            :class="{ 'nc-hour-border': slot.isHour }"
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
    name: 'DayView',

    props: {
        events: {
            type: Array,
            default: () => [],
        },
        currentDate: {
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
        displayStaff() {
            return this.staffList.length > 0
                ? this.staffList
                : [{ id: 0, name: 'Toate', color: '#4299e1' }];
        },

        colCount() {
            return this.displayStaff.length + 1; // +1 for gutter
        },

        headerGridStyle() {
            return {
                display: 'grid',
                gridTemplateColumns: `60px repeat(${this.displayStaff.length}, 1fr)`,
            };
        },

        bodyGridStyle() {
            return {
                position: 'relative',
            };
        },

        rowGridStyle() {
            return {
                display: 'grid',
                gridTemplateColumns: `60px repeat(${this.displayStaff.length}, 1fr)`,
            };
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

        positionedEvents() {
            const ROW_HEIGHT = 30;
            const GUTTER_WIDTH = 60;

            return this.events.map((event) => {
                const eventStart = new Date(event.start);
                const eventEnd = new Date(event.end);

                const startMinutes = eventStart.getHours() * 60 + eventStart.getMinutes();
                const endMinutes = eventEnd.getHours() * 60 + eventEnd.getMinutes();

                const clampedStart = Math.max(startMinutes, this.startHour * 60);
                const clampedEnd = Math.min(endMinutes, this.endHour * 60);
                if (clampedEnd <= clampedStart) return null;

                const topSlots = (clampedStart - this.startHour * 60) / 30;
                const heightSlots = (clampedEnd - clampedStart) / 30;

                // Find staff column
                const staffIndex = this.displayStaff.findIndex((s) => s.id === event.staff_id);
                const colIndex = staffIndex !== -1 ? staffIndex : 0;
                const totalCols = this.displayStaff.length;

                const staffColor = this.displayStaff[colIndex]?.color || '#4299e1';

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
                        left: `calc(${GUTTER_WIDTH}px + ${colIndex} * ((100% - ${GUTTER_WIDTH}px) / ${totalCols}) + 2px)`,
                        width: `calc((100% - ${GUTTER_WIDTH}px) / ${totalCols} - 4px)`,
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
