<template src="./Preprocess.html">
  
</template>

<script>
export default {
  data (){
    return {
      distinct_rows: {},
      distinct_rows_percentage: 0,
      distinct_ids: {},
      distinct_ids_percentage: 0,
      columns: [],
      tableData: [],
      chart: {
                    labelOptions: {
                            show: true,
                            position: 'inner',
                            distance: 0.25,
                            textStyle: {
                                color: 'rgba(256, 256, 256, 0.87)',
                                fontFamily: 'Verdana',
                                fontSize: 12,
                                fontWeight: 300
                            }
                        },
                    config: {
                        theme: "default",
                        dataLoaded: true
                    },
                    option: {
                        color: [
                                '#01bcd4', '#b6a2de', '#5ab1ef', '#ffce3d', '#df474f',
                                '#df4148', '#f3f39d', '#cb8e85', '#ed9678', '#e7dac9',
                                '#1e90ff', '#ff6347', '#7b68ee', '#00fa9a', '#ffd700'
                            ],
                        tooltip: {
                            trigger: 'item',
                            formatter: "{b} <br/> {c} ({d}%)"
                        },
                        legend: {
                            orient: 'vertical',
                            x: 'left',
                            data: ['Understand', 'Own', 'Deliver']
                        },
                        toolbox: {
                            show: true,
                            feature: {
                                mark: {
                                    show: true,
                                    title: 'Mark'
                                },
                                dataView: {
                                    show: true,
                                    title: 'Data View',
                                    readOnly: false
                                },
                                magicType: {
                                    show: true,
                                    title: 'Transform to Funnel',
                                    type: ['pie', 'funnel']
                                },
                                restore: {
                                    show: true,
                                    title: 'Restore'
                                },
                                saveAsImage: {
                                    show: true,
                                    title: 'Save as Image'
                                }
                            }
                        },
                        calculable: false,
                        series: [{
                                name: 'Metric',
                                type: 'pie',
                                radius: [0, 80],
                                roseType: 'area',
                                selectedOffset: 1,
                                selectedMode: 'single',
                                x: '20%', // for funnel
                                width: '40%', // for funnel
                                max: 40, // for funnel
                                itemStyle: {
                                              normal: {
                                                  label: {
                                                      show: true,
                                                      position: 'inner',
                                                      distance: 0.25,
                                                      textStyle: {
                                                          color: 'rgba(256, 256, 256, 0.87)',
                                                          fontFamily: 'Verdana',
                                                          fontSize: 12,
                                                          fontWeight: 300
                                                      }
                                                  },
                                                  labelLine: {
                                                      show: false
                                                  }
                                              },
                                              emphasis: {
                                                  label: {
                                                      show: true,
                                                      position: 'inner',
                                                      distance: 0.25,
                                                      textStyle: {
                                                          color: 'rgba(256, 256, 256, 0.87)',
                                                          fontFamily: 'Verdana',
                                                          fontSize: 12,
                                                          fontWeight: 300
                                                      }
                                                  },
                                                  labelLine: {
                                                      show: false
                                                  }
                                              }
                                          },
                                data: [{
                                        value: 100,
                                        name: 'Rows'
                                    },
                                    {
                                        value: 80,
                                        name: 'Ids'
                                    },
                                    {
                                        value: 100,
                                        name: 'Missing'
                                    }
                                ]
                            },
                            {
                                name: 'Overall',
                                type: 'pie',
                                radius: [85, 105],
                                startAngle: 180,
                                selectedOffset: 1,

                                // for funnel
                                x: '60%',
                                width: '35%',
                                funnelAlign: 'left',
                                max: 100,

                                itemStyle: {
                                    normal: {
                                        labelLine: {
                                            show: true,
                                            length: 30
                                        }
                                    }
                                },

                                data: [{
                                        value: 80,
                                        name: 'Overall'
                                    },
                                    {
                                        value: 44,
                                        name: 'invisible',
                                        itemStyle: {
                                              normal: {
                                                  color: 'rgba(0,0,0,0)',
                                                  label: {
                                                      show: false
                                                  },
                                                  labelLine: {
                                                      show: false
                                                  }
                                              },
                                              emphasis: {
                                                  color: 'rgba(0,0,0,0)'
                                              }
                                          }
                                    }
                                ]
                            },
                            {
                                name: 'Benchmark',
                                type: 'pie',
                                radius: [110, 130],
                                startAngle: 180,
                                selectedOffset: 1,

                                // for funnel
                                x: '60%',
                                width: '35%',
                                funnelAlign: 'left',
                                max: 100,

                                data: [{
                                        value: 80,
                                        name: 'Benchmark'
                                    },
                                    {
                                        value: 10,
                                        name: 'invisible',
                                        itemStyle: {
                                                normal: {
                                                    color: 'rgba(0,0,0,0)',
                                                    label: {
                                                        show: false
                                                    },
                                                    labelLine: {
                                                        show: false
                                                    }
                                                },
                                                emphasis: {
                                                    color: 'rgba(0,0,0,0)'
                                                }
                                            }
                                    }
                                ]
                            }
                        ]
                    }
                },
    
    }
  },
  created() {
    this.fetchRows(),
    this.fetchIds(),
    this.fetchMissing()
  },
  methods: {
    fetchRows() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/rows/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.distinct_rows = data.body[0]
        this.distinct_rows_percentage = (this.distinct_rows.distinct_rows / this.total_count)*100

        if (this.distinct_rows_percentage != NaN) {
          this.distinct_rows_percentage = 100
        }
      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchIds() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/ids/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        this.distinct_ids = data.body[0]
        this.distinct_ids_percentage = (this.distinct_ids.distinct_ids / this.distinct_ids.total_ids)*100
        
        if (this.distinct_ids_percentage == NaN) {
          this.distinct_ids_percentage = 100
        }

      })
      .catch(error => {
        console.log(error)
      })
    },
    fetchMissing() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/missing/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
        this.item = data.body[0]
        
        // this.columns = JSON.parse(this.item.missing_columns)
        this.columns = this.item.missing_columns
        // this.tableData = JSON.parse(this.item.missing_data)
        console.log(this.tableData)

      })
      .catch(error => {
        console.log(error)
      })
    }
  }
}
</script>

<style scoped>
.VuePagination {
  text-align: center;
}

.vue-title {
  text-align: center;
  margin-bottom: 10px;
}

.vue-pagination-ad {
  text-align: center;
}

.glyphicon.glyphicon-eye-open {
  width: 16px;
  display: block;
  margin: 0 auto;
}

th:nth-child(3) {
  text-align: center;
}

.VueTables__child-row-toggler {
  width: 16px;
  height: 16px;
  line-height: 16px;
  display: block;
  margin: auto;
  text-align: center;
}

.VueTables__child-row-toggler--closed::before {
  content: "+";
}

.VueTables__child-row-toggler--open::before {
  content: "-";
}
</style>
