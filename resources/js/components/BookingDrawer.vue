<template>
    <teleport to="body">
        <transition name="nc-drawer-fade">
            <div
                v-if="open"
                class="nc-drawer-backdrop"
                @click.self="$emit('close')"
            >
                <transition :name="transitionName" appear>
                    <aside
                        v-if="open && event"
                        class="nc-drawer"
                        :class="{ 'nc-drawer-mobile': isMobile, 'nc-drawer-right': !isMobile }"
                        role="dialog"
                        aria-modal="true"
                    >
                        <div v-if="isMobile" class="nc-drawer-grip" @click="$emit('close')"></div>

                        <header class="nc-drawer-header">
                            <div class="nc-drawer-title">
                                <h2>{{ event.client_name || '—' }}</h2>
                                <span
                                    class="nc-status-pill"
                                    :style="statusPillStyle"
                                >{{ statusLabel }}</span>
                            </div>
                            <button
                                type="button"
                                class="nc-drawer-close"
                                aria-label="Închide"
                                @click="$emit('close')"
                            >×</button>
                        </header>

                        <div class="nc-drawer-body">
                            <div v-if="event.reference" class="nc-field">
                                <div class="nc-field-label">Cod</div>
                                <div class="nc-field-value nc-reference">{{ event.reference }}</div>
                            </div>

                            <div class="nc-field">
                                <div class="nc-field-label">Când</div>
                                <div
                                    class="nc-field-value nc-when"
                                    :class="{ 'nc-when-toggleable': relativeAvailable }"
                                    @click="onToggleWhen"
                                >
                                    {{ whenDisplay }}
                                </div>
                            </div>

                            <div v-if="event.service_name" class="nc-field">
                                <div class="nc-field-label">Serviciu</div>
                                <div class="nc-field-value">
                                    {{ event.service_name }}<span
                                        v-if="event.duration_minutes"
                                    > · {{ event.duration_minutes }} min</span>
                                </div>
                            </div>

                            <div v-if="event.staff_name" class="nc-field">
                                <div class="nc-field-label">Personal</div>
                                <div class="nc-field-value">{{ event.staff_name }}</div>
                            </div>

                            <div class="nc-field">
                                <div class="nc-field-label">Client</div>
                                <div class="nc-field-value">
                                    <div>{{ event.client_name || '—' }}</div>
                                    <a
                                        v-if="event.client_email"
                                        :href="`mailto:${event.client_email}`"
                                        class="nc-link"
                                    >{{ event.client_email }}</a>
                                    <a
                                        v-if="event.client_phone"
                                        :href="`tel:${event.client_phone}`"
                                        class="nc-link"
                                    >{{ event.client_phone }}</a>
                                </div>
                            </div>

                            <div class="nc-field">
                                <div class="nc-field-label-row">
                                    <div class="nc-field-label">Notițe</div>
                                    <button
                                        v-if="!editingNotes && event.notes"
                                        type="button"
                                        class="nc-icon-btn"
                                        aria-label="Editează notițe"
                                        @click="startEditingNotes"
                                    >✎</button>
                                </div>
                                <div v-if="!editingNotes" class="nc-field-value nc-notes">
                                    <span v-if="event.notes">{{ event.notes }}</span>
                                    <button
                                        v-else
                                        type="button"
                                        class="nc-text-btn"
                                        @click="startEditingNotes"
                                    >Adaugă o notă</button>
                                </div>
                                <div v-else class="nc-notes-editor">
                                    <textarea
                                        v-model="notesDraft"
                                        rows="4"
                                        class="nc-textarea"
                                    ></textarea>
                                    <div class="nc-inline-actions">
                                        <button
                                            type="button"
                                            class="nc-btn nc-btn-primary"
                                            :disabled="saving"
                                            @click="$emit('save-notes', { notes: notesDraft })"
                                        >Salvează</button>
                                        <button
                                            type="button"
                                            class="nc-btn nc-btn-ghost"
                                            @click="cancelEditingNotes"
                                        >Renunță</button>
                                    </div>
                                </div>
                            </div>

                            <div
                                v-if="formResponseEntries.length"
                                class="nc-field"
                            >
                                <div class="nc-field-label">Răspunsuri formular</div>
                                <dl class="nc-form-responses">
                                    <template v-for="entry in formResponseEntries" :key="entry.key">
                                        <dt>{{ entry.label }}</dt>
                                        <dd>{{ entry.value }}</dd>
                                    </template>
                                </dl>
                            </div>

                            <div v-if="timelineEntries.length" class="nc-field">
                                <div class="nc-field-label">Istoric</div>
                                <ol class="nc-timeline">
                                    <li
                                        v-for="entry in timelineEntries"
                                        :key="entry.id"
                                        class="nc-timeline-item"
                                    >
                                        <div class="nc-timeline-dot" :style="{ backgroundColor: entry.color }"></div>
                                        <div class="nc-timeline-content">
                                            <div class="nc-timeline-label">{{ entry.label }}</div>
                                            <div v-if="entry.detail" class="nc-timeline-detail">{{ entry.detail }}</div>
                                            <div class="nc-timeline-time" :title="entry.absoluteTime">{{ entry.displayTime }}</div>
                                        </div>
                                    </li>
                                </ol>
                            </div>

                            <div v-if="actionable" class="nc-field">
                                <div class="nc-field-label">Acțiuni</div>
                                <div v-if="!cancelling" class="nc-action-buttons">
                                    <button
                                        type="button"
                                        class="nc-btn nc-btn-primary"
                                        :disabled="saving"
                                        @click="$emit('mark-completed')"
                                    >Finalizează</button>
                                    <button
                                        type="button"
                                        class="nc-btn nc-btn-secondary"
                                        :disabled="saving"
                                        @click="$emit('mark-no-show')"
                                    >Marchează neprezentare</button>
                                    <button
                                        type="button"
                                        class="nc-btn nc-btn-danger"
                                        :disabled="saving"
                                        @click="cancelling = true"
                                    >Anulează</button>
                                </div>
                                <div v-else class="nc-cancel-form">
                                    <textarea
                                        v-model="cancelReason"
                                        rows="3"
                                        class="nc-textarea"
                                        placeholder="Motiv anulare (opțional)"
                                    ></textarea>
                                    <div class="nc-inline-actions">
                                        <button
                                            type="button"
                                            class="nc-btn nc-btn-danger"
                                            :disabled="saving"
                                            @click="$emit('cancel-booking', { reason: cancelReason })"
                                        >Confirmă anulare</button>
                                        <button
                                            type="button"
                                            class="nc-btn nc-btn-ghost"
                                            @click="cancelling = false; cancelReason = ''"
                                        >Înapoi</button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <footer class="nc-drawer-footer">
                            <button
                                type="button"
                                class="nc-btn nc-btn-primary nc-btn-block"
                                @click="$emit('go-to-resource')"
                            >Mergi la rezervare</button>
                        </footer>
                    </aside>
                </transition>
            </div>
        </transition>
    </teleport>
</template>

<script>
const STATUS_LABELS = {
    scheduled: 'Programat',
    completed: 'Finalizat',
    cancelled: 'Anulat',
    no_show: 'Neprezentare',
    rescheduled: 'Reprogramat',
    pending: 'În așteptare',
};

const STATUS_COLORS = {
    scheduled:   { bg: '#bfdbfe', text: '#1e3a8a' },
    completed:   { bg: '#bbf7d0', text: '#14532d' },
    cancelled:   { bg: '#fecaca', text: '#7f1d1d' },
    no_show:     { bg: '#fed7aa', text: '#7c2d12' },
    rescheduled: { bg: '#ddd6fe', text: '#4c1d95' },
    pending:     { bg: '#e2e8f0', text: '#334155' },
};

const ACTIONABLE_STATUSES = ['scheduled', 'pending', 'rescheduled'];

const TWELVE_HOURS_MS = 12 * 60 * 60 * 1000;
const ONE_DAY_MS = 24 * 60 * 60 * 1000;

const MONTHS_RO = [
    'ianuarie','februarie','martie','aprilie','mai','iunie',
    'iulie','august','septembrie','octombrie','noiembrie','decembrie',
];

const MONTHS_RO_SHORT = [
    'ian','feb','mar','apr','mai','iun',
    'iul','aug','sep','oct','noi','dec',
];

const TIMELINE_META = {
    'booking.created':     { label: 'Programare creată', color: '#1e3a8a' },
    'booking.rescheduled': { label: 'Reprogramată',      color: '#4c1d95' },
    'booking.cancelled':   { label: 'Anulată',           color: '#7f1d1d' },
    'booking.completed':   { label: 'Finalizată',        color: '#14532d' },
    'booking.no_show':     { label: 'Neprezentare',      color: '#7c2d12' },
};

export default {
    props: {
        event: {
            type: Object,
            default: null,
        },
        open: {
            type: Boolean,
            default: false,
        },
        saving: {
            type: Boolean,
            default: false,
        },
    },

    emits: [
        'close',
        'mark-completed',
        'mark-no-show',
        'cancel-booking',
        'save-notes',
        'go-to-resource',
    ],

    data() {
        return {
            showAbsolute: false,
            editingNotes: false,
            notesDraft: '',
            cancelling: false,
            cancelReason: '',
            windowWidth: typeof window !== 'undefined' ? window.innerWidth : 1024,
        };
    },

    computed: {
        isMobile() {
            return this.windowWidth < 768;
        },
        transitionName() {
            return this.isMobile ? 'nc-drawer-slide-up' : 'nc-drawer-slide-right';
        },
        statusLabel() {
            return STATUS_LABELS[this.event?.status] || this.event?.status || '';
        },
        statusPillStyle() {
            const entry = STATUS_COLORS[this.event?.status] || { bg: '#e5e7eb', text: '#374151' };
            return {
                backgroundColor: entry.bg,
                color: entry.text,
            };
        },
        actionable() {
            return ACTIONABLE_STATUSES.includes(this.event?.status);
        },
        startsAtDate() {
            if (!this.event?.start) return null;
            const d = new Date(this.event.start);
            return isNaN(d) ? null : d;
        },
        endsAtDate() {
            if (!this.event?.end) return null;
            const d = new Date(this.event.end);
            return isNaN(d) ? null : d;
        },
        diffMs() {
            if (!this.startsAtDate) return null;
            return this.startsAtDate.getTime() - Date.now();
        },
        relativeAvailable() {
            return this.diffMs !== null && Math.abs(this.diffMs) <= TWELVE_HOURS_MS;
        },
        relativeText() {
            if (this.diffMs === null) return '';
            const abs = Math.abs(this.diffMs);
            const hours = Math.floor(abs / (60 * 60 * 1000));
            const minutes = Math.floor((abs % (60 * 60 * 1000)) / (60 * 1000));
            let unit;
            if (hours >= 1) {
                unit = hours === 1 ? 'oră' : 'ore';
                if (this.diffMs >= 0) return `peste ${hours} ${unit}`;
                return `acum ${hours} ${unit}`;
            }
            unit = minutes === 1 ? 'minut' : 'minute';
            if (this.diffMs >= 0) return `peste ${minutes} ${unit}`;
            return `acum ${minutes} ${unit}`;
        },
        absoluteText() {
            if (!this.startsAtDate) return '—';
            const s = this.startsAtDate;
            const e = this.endsAtDate;
            const dayMonthYear = `${s.getDate()} ${MONTHS_RO[s.getMonth()]} ${s.getFullYear()}`;
            const startTime = `${this.pad(s.getHours())}:${this.pad(s.getMinutes())}`;
            if (!e) return `${dayMonthYear}, ${startTime}`;
            const endTime = `${this.pad(e.getHours())}:${this.pad(e.getMinutes())}`;
            return `${dayMonthYear}, ${startTime} – ${endTime}`;
        },
        whenDisplay() {
            if (!this.relativeAvailable) return this.absoluteText;
            return this.showAbsolute ? this.absoluteText : this.relativeText;
        },
        formResponseEntries() {
            const fr = this.event?.field_responses;
            if (!Array.isArray(fr)) return [];
            return fr
                .filter((entry) => entry && entry.value !== null && entry.value !== '' && !(Array.isArray(entry.value) && entry.value.length === 0))
                .map((entry) => ({
                    key: entry.key,
                    label: entry.label || entry.key,
                    value: Array.isArray(entry.value) ? entry.value.join(', ') : String(entry.value),
                }));
        },
        timelineEntries() {
            const timeline = this.event?.timeline;
            if (!Array.isArray(timeline)) return [];
            return timeline.map((entry) => this.formatTimelineEntry(entry));
        },
    },

    watch: {
        event() {
            this.resetTransientState();
        },
        open(isOpen) {
            if (isOpen) {
                this.resetTransientState();
                document.addEventListener('keydown', this.handleEscape);
            } else {
                document.removeEventListener('keydown', this.handleEscape);
            }
        },
    },

    mounted() {
        window.addEventListener('resize', this.handleResize);
    },

    beforeUnmount() {
        window.removeEventListener('resize', this.handleResize);
        document.removeEventListener('keydown', this.handleEscape);
    },

    methods: {
        pad(n) {
            return String(n).padStart(2, '0');
        },
        handleResize() {
            this.windowWidth = window.innerWidth;
        },
        handleEscape(e) {
            if (e.key === 'Escape') this.$emit('close');
        },
        onToggleWhen() {
            if (this.relativeAvailable) this.showAbsolute = !this.showAbsolute;
        },
        startEditingNotes() {
            this.notesDraft = this.event?.notes || '';
            this.editingNotes = true;
        },
        cancelEditingNotes() {
            this.editingNotes = false;
            this.notesDraft = '';
        },
        resetTransientState() {
            this.showAbsolute = false;
            this.editingNotes = false;
            this.notesDraft = '';
            this.cancelling = false;
            this.cancelReason = '';
        },
        formatTimelineEntry(entry) {
            const meta = TIMELINE_META[entry.type] || { label: entry.type, color: '#6b7280' };
            const date = entry.occurred_at ? new Date(entry.occurred_at) : null;
            const valid = date && !isNaN(date);
            const now = Date.now();
            const absolute = valid ? this.formatCompactDate(date) : '';
            let displayTime = absolute;
            if (valid && now - date.getTime() <= ONE_DAY_MS && date.getTime() <= now) {
                displayTime = this.formatRelativePast(date, now);
            }
            const detail = entry.data?.reference || entry.data?.service || '';
            return {
                id: entry.id,
                label: meta.label,
                color: meta.color,
                detail,
                displayTime,
                absoluteTime: absolute,
            };
        },
        formatCompactDate(date) {
            return `${date.getDate()} ${MONTHS_RO_SHORT[date.getMonth()]} ${date.getFullYear()}, ${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
        },
        formatRelativePast(date, now) {
            const diff = now - date.getTime();
            const minutes = Math.floor(diff / (60 * 1000));
            if (minutes < 1) return 'acum câteva secunde';
            if (minutes < 60) return `acum ${minutes} ${minutes === 1 ? 'minut' : 'minute'}`;
            const hours = Math.floor(minutes / 60);
            return `acum ${hours} ${hours === 1 ? 'oră' : 'ore'}`;
        },
    },
};
</script>

<style scoped>
.nc-drawer-backdrop {
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.45);
    z-index: 1000;
    display: flex;
}

.nc-drawer {
    background: var(--bg-gray-100, #fff);
    color: var(--text-gray-800, #111827);
    display: flex;
    flex-direction: column;
    box-shadow: -4px 0 24px rgba(0, 0, 0, 0.15);
    overflow: hidden;
}

:global(.dark) .nc-drawer {
    background: #1f2937;
    color: #f3f4f6;
}

.nc-drawer-right {
    width: 420px;
    max-width: 100vw;
    height: 100vh;
    margin-left: auto;
}

.nc-drawer-mobile {
    width: 100vw;
    max-height: 85vh;
    height: 85vh;
    margin-top: auto;
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
    box-shadow: 0 -4px 24px rgba(0, 0, 0, 0.2);
}

.nc-drawer-grip {
    width: 40px;
    height: 4px;
    border-radius: 2px;
    background: rgba(156, 163, 175, 0.6);
    margin: 8px auto 0;
    cursor: pointer;
}

.nc-drawer-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    padding: 16px 20px 12px;
    border-bottom: 1px solid rgba(156, 163, 175, 0.2);
}

.nc-drawer-title {
    display: flex;
    flex-direction: column;
    gap: 6px;
    min-width: 0;
}

.nc-drawer-title h2 {
    font-size: 18px;
    font-weight: 600;
    margin: 0;
    line-height: 1.2;
    word-break: break-word;
}

.nc-status-pill {
    align-self: flex-start;
    font-size: 11px;
    font-weight: 600;
    padding: 2px 10px;
    border-radius: 999px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
}

.nc-drawer-close {
    background: transparent;
    border: 0;
    font-size: 26px;
    line-height: 1;
    color: inherit;
    cursor: pointer;
    padding: 0 4px;
    opacity: 0.6;
}

.nc-drawer-close:hover {
    opacity: 1;
}

.nc-drawer-body {
    flex: 1 1 auto;
    overflow-y: auto;
    padding: 16px 20px 20px;
    display: flex;
    flex-direction: column;
    gap: 14px;
}

.nc-field {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nc-field-label-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}

.nc-field-label {
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: rgba(107, 114, 128, 0.9);
    font-weight: 600;
}

.nc-field-value {
    font-size: 14px;
    line-height: 1.4;
}

.nc-field-value a.nc-link {
    display: block;
    color: rgb(59, 130, 246);
    text-decoration: none;
    font-size: 13px;
    margin-top: 2px;
}

.nc-field-value a.nc-link:hover {
    text-decoration: underline;
}

.nc-reference {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 13px;
}

.nc-when-toggleable {
    cursor: pointer;
    text-decoration: underline dotted;
    text-underline-offset: 3px;
}

.nc-notes {
    white-space: pre-wrap;
    word-break: break-word;
}

.nc-muted {
    color: rgba(107, 114, 128, 0.8);
    font-style: italic;
}

.nc-text-btn {
    background: transparent;
    border: 0;
    padding: 0;
    color: rgb(59, 130, 246);
    font-size: 13px;
    cursor: pointer;
    font-family: inherit;
}

.nc-text-btn:hover {
    text-decoration: underline;
}

.nc-icon-btn {
    background: transparent;
    border: 0;
    cursor: pointer;
    font-size: 14px;
    color: rgba(107, 114, 128, 0.9);
    padding: 2px 6px;
    border-radius: 4px;
}

.nc-icon-btn:hover {
    background: rgba(156, 163, 175, 0.15);
    color: inherit;
}

.nc-textarea {
    width: 100%;
    padding: 8px 10px;
    border: 1px solid rgba(156, 163, 175, 0.4);
    border-radius: 6px;
    font-size: 14px;
    font-family: inherit;
    background: transparent;
    color: inherit;
    resize: vertical;
}

.nc-textarea:focus {
    outline: 2px solid rgba(59, 130, 246, 0.4);
    outline-offset: 0;
    border-color: rgb(59, 130, 246);
}

.nc-inline-actions,
.nc-action-buttons {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
    margin-top: 8px;
}

.nc-btn {
    font-size: 13px;
    font-weight: 500;
    padding: 8px 14px;
    border-radius: 6px;
    border: 0;
    cursor: pointer;
    transition: background-color 0.15s;
}

.nc-btn:disabled {
    opacity: 0.55;
    cursor: not-allowed;
}

.nc-btn-primary {
    background: rgb(59, 130, 246);
    color: #fff;
}
.nc-btn-primary:hover:not(:disabled) {
    background: rgb(37, 99, 235);
}

.nc-btn-secondary {
    background: rgba(156, 163, 175, 0.25);
    color: inherit;
}
.nc-btn-secondary:hover:not(:disabled) {
    background: rgba(156, 163, 175, 0.4);
}

.nc-btn-danger {
    background: rgb(239, 68, 68);
    color: #fff;
}
.nc-btn-danger:hover:not(:disabled) {
    background: rgb(220, 38, 38);
}

.nc-btn-ghost {
    background: transparent;
    color: inherit;
    border: 1px solid rgba(156, 163, 175, 0.4);
}
.nc-btn-ghost:hover:not(:disabled) {
    background: rgba(156, 163, 175, 0.15);
}

.nc-btn-block {
    width: 100%;
}

.nc-form-responses {
    display: grid;
    grid-template-columns: max-content 1fr;
    gap: 4px 12px;
    margin: 0;
    font-size: 13px;
}

.nc-form-responses dt {
    font-weight: 500;
    color: rgba(107, 114, 128, 0.9);
}

.nc-form-responses dd {
    margin: 0;
    word-break: break-word;
}

.nc-timeline {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.nc-timeline-item {
    display: grid;
    grid-template-columns: 12px 1fr;
    gap: 10px;
    position: relative;
}

.nc-timeline-item + .nc-timeline-item::before {
    content: '';
    position: absolute;
    top: -10px;
    left: 5px;
    width: 2px;
    height: 10px;
    background: rgba(156, 163, 175, 0.3);
}

.nc-timeline-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-top: 4px;
    box-shadow: 0 0 0 2px rgba(255, 255, 255, 0.9);
}

:global(.dark) .nc-timeline-dot {
    box-shadow: 0 0 0 2px #1f2937;
}

.nc-timeline-content {
    font-size: 13px;
    line-height: 1.35;
}

.nc-timeline-label {
    font-weight: 500;
}

.nc-timeline-detail {
    color: rgba(107, 114, 128, 0.9);
    font-size: 12px;
    margin-top: 1px;
}

.nc-timeline-time {
    color: rgba(107, 114, 128, 0.8);
    font-size: 11px;
    margin-top: 2px;
}

.nc-drawer-footer {
    padding: 14px 20px;
    border-top: 1px solid rgba(156, 163, 175, 0.2);
    background: rgba(249, 250, 251, 0.6);
}

:global(.dark) .nc-drawer-footer {
    background: rgba(17, 24, 39, 0.6);
}

/* Transitions */
.nc-drawer-fade-enter-active,
.nc-drawer-fade-leave-active {
    transition: opacity 0.2s;
}
.nc-drawer-fade-enter-from,
.nc-drawer-fade-leave-to {
    opacity: 0;
}

.nc-drawer-slide-right-enter-active,
.nc-drawer-slide-right-leave-active {
    transition: transform 0.25s ease;
}
.nc-drawer-slide-right-enter-from,
.nc-drawer-slide-right-leave-to {
    transform: translateX(100%);
}

.nc-drawer-slide-up-enter-active,
.nc-drawer-slide-up-leave-active {
    transition: transform 0.25s ease;
}
.nc-drawer-slide-up-enter-from,
.nc-drawer-slide-up-leave-to {
    transform: translateY(100%);
}
</style>
