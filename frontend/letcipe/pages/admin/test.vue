<template>
  <div data-app>
    <v-container>
      <v-row>
        <v-col cols="12" lg="2">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="s_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="s_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker v-model="s_date" no-title scrollable :max="e_date">
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu1 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="s_date_search(s_date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>

        <v-col cols="12" lg="2">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="e_date"
            transition="scale-transition"
            offset-y
            min-width="290px"
          >
            <template #activator="{ on, attrs }">
              <v-text-field
                v-model="e_date"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              v-model="e_date"
              no-title
              scrollable
              :min="s_date"
              :max="date"
            >
              <v-spacer></v-spacer>
              <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
              <v-btn text color="primary" @click="e_date_search(e_date)"
                >OK</v-btn
              >
            </v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="genItems"
            item-text="state"
            item-value="abbr"
            label="??????"
            @change="select_gen"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="ageItems"
            item-text="state"
            item-value="abbr"
            label="?????? ???"
            @change="select_age"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="2">
          <v-select
            :items="famItems"
            item-text="state"
            item-value="abbr"
            label="?????? ???"
            @change="select_fam"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="3">
          <v-select
            :items="jobItems"
            item-text="state"
            item-value="abbr"
            label="?????? ??????"
            @change="select_job"
          ></v-select>
        </v-col>
        <v-col class="d-flex" cols="12" sm="1">
          <v-btn x-large @click="getChartData">??????</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <Bar :chart-data="chartData" :chart-options="chartOptions" />
        <Line :chart-data="chartData" :chart-options="chartOptions" />
        <Pie :chart-data="chartData" :chart-options="chartOptions" />
      </v-row>
    </v-container>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex'
// DataPage.vue
import { Bar, Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale
)

export default {
  name: 'AdminTestIndex',
  components: {
    Bar,
    Line,
    Pie,
  },
  data() {
    return {
      date: new Date().toISOString().substr(0, 10),
      s_date: new Date().toISOString().substr(0, 10),
      e_date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      genItems: [
        { state: '?????? ??? ???', abbr: '-' },
        { state: '??????', abbr: 'M' },
        { state: '??????', abbr: 'F' },
      ],
      ageItems: [
        { state: '?????? ??? ???', abbr: '-' },
        { state: '10???', abbr: '10' },
        { state: '20???', abbr: '20' },
        { state: '30???', abbr: '30' },
        { state: '40???', abbr: '40' },
        { state: '50???', abbr: '50' },
        { state: '60???', abbr: '60' },
      ],
      famItems: [
        { state: '?????? ??? ???', abbr: '-' },
        { state: '1??? ??????', abbr: '1' },
        { state: '2??? ??????', abbr: '2' },
        { state: '3??? ??????', abbr: '3' },
        { state: '4??? ??????', abbr: '4' },
      ],
      jobItems: [
        { state: '?????? ??? ???', abbr: '-' },
        { state: '??????', abbr: 'STUDENT' },
        { state: '??????', abbr: 'JUBU' },
        { state: '?????????', abbr: 'WORKER' },
        { state: '?????????', abbr: 'COOK' },
      ],
      attr: {
        gen: '-',
        age: '-',
        fam: '-',
        job: '-',
      },
    }
  },
  computed: {
    ...mapState('search', ['charts']),
  },
  created() {
    // this.CLEAR_CHARTS()
  },
  methods: {
    ...mapActions('search', ['getCharts']),
    ...mapMutations('search', ['CLEAR_CHARTS']),

    s_date_search(v) {
      this.s_date = v
      this.menu1 = false
      this.$refs.menu1.save(v)
    },
    e_date_search(v) {
      this.e_date = v
      this.menu2 = false
      this.$refs.menu2.save(v)
    },
    async getChartData() {
      const attribute =
        this.attr.gen +
        ',' +
        this.attr.age +
        ',' +
        this.attr.fam +
        ',' +
        this.attr.job

      const params = {
        attr: attribute,
        begin: this.s_date,
        end: this.e_date,
        size: 2,
        page: 0,
      }

      await this.getCharts(params)

      this.$refs.chartChild.getData()
    },
    select_gen(e) {
      this.attr.gen = e
    },
    select_age(e) {
      this.attr.age = e
    },
    select_fam(e) {
      this.attr.fam = e
    },
    select_job(e) {
      this.attr.job = e
    },
  },
}
</script>
<style lang="scss" scoped>
.row {
  justify-content: center;
}
</style>
