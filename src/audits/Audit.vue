<template src="./Audit.html" >
</template>

<script>
import Answer from './Answer'
import Detail from './Audit_details'
export default {
  data (){
    return {
      audits: [],
      audits_count: 0,
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
                                        value: 95,
                                        name: 'Drinks'
                                    },
                                    {
                                        value: 45,
                                        name: 'Fruits'
                                    },
                                    {
                                        value: 62,
                                        name: 'Veges'
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
                                        value: 56,
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
                                        value: 20,
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

  computed: {
    token: function() {
      return this.$store.state.key
    },
  },

  created() {
    this.fetchData()
  },

  methods: {
    fetchData() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/audits/',
        withCredentials: true,
        headers: {
          Authorization: 'Bearer '+{token:this.token}
        }
      })
      .then (data =>{
        this.audits_count = data.body.count
        this.audits = data.body.results
      })
      .catch(error => {
        console.log(error)
      })
    }
  },
};
</script>

<style src="./Audit.less" scoped>
</style>
