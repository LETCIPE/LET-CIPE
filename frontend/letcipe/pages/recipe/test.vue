<template>
  <v-container>
    <v-app>
      <v-row>
        <v-col cols="12" lg="6">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="dateFormatted"
                label="Date"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                v-bind="attrs"
                @blur="date = parseDate(dateFormatted)"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu1 = false"></v-date-picker>
          </v-menu>
          <p>
            Date in ISO format:
            <strong>{{ date }}</strong>
          </p>
        </v-col>

        <v-col cols="12" lg="6">
          <v-menu
            v-model="menu2"
            :close-on-content-click="false"
            transition="scale-transition"
            offset-y
            max-width="290px"
            min-width="auto"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="computedDateFormatted"
                label="Date (read only text field)"
                hint="MM/DD/YYYY format"
                persistent-hint
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="date" no-title @input="menu2 = false"></v-date-picker>
          </v-menu>
          <p>
            Date in ISO format:
            <strong>{{ date }}</strong>
          </p>
        </v-col>
      </v-row>
    </v-app>
  </v-container>
</template>

<script>
// import ChartComponent from '@/components/ChartComponent.vue'
export default {
  name: 'AdminPAGE',
  components: {
    // ChartComponent,
  },
  data() {
    return {
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      dateFormatted: '',
      menu1: false,
      menu2: false,
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },
  },
  created() {
    // this.dateFormatted = this.formatDate(
    //   new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
    //     .toISOString()
    //     .substr(0, 10)
    // )
    this.dateFormatted = this.formatDate(this.date)
  },

  methods: {
    formatDate(date) {
      if (!date) return null
      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null
      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
<style lang="scss" scoped>
.row {
  justify-content: center;
}
</style>