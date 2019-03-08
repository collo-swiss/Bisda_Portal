<template src="./Answer.html"> 
</template>

<script>
export default {
  data (){
    return {
      questions: [],
      choices: [],
      count: 0,
      active_question_id: 0,
      next_question_id: 1,
      previous_question_id: -1,
      question: "",
      answer: 0,
      answered: false,
    }
  },

  computed: {
    token: function() {
      return this.$store.state.key
    },
    user: function() {
      return this.$store.state.user
    },
    project: function() {
      return this.$store.state.project
    }
  },

  created() {
    this.fetchData(),
    this.answersLoaded(),
    this.setQuestionTemplate()
  },

  methods: {
    fetchData() {
      this.$http({
        method: 'get',
        url : 'http://localhost:8000/audits/80093d4c-3967-4ac7-a342-c2da3deaa7d4/questions/',
        withCredentials: true,
        headers: {
          Authorization: 'Bearer '+{token:this.token}
        }
      })
      .then (data =>{
        this.count = data.body.count
        console.log(data.body)

        this.questions = data.body.results
        this.question = this.questions[0]
      })
      .catch(error => {
        console.log(error)
      })
    },
    setQuestionTemplate() {
      this.choices = this.question, "choices", []
      this.template = this.question, "choice_type.template", "basic"
      this.answer_template = "audits/answers/" + this.template + ".html"
      this.choice_width = this.choices.length ? (100 / this.choices.length) : 100;
      this.choice_styles = {
          width: this.choice_width + "%"
      };            
    },
    answersLoaded() {

    },
    saveQuestionAnswer() {

    },
    previousQuestion() {
      if (this.active_question_id > 0) {
          this.active_question_id = this.active_question_id - 1;
          this.next_question_id = this.active_question_id + 1;
          this.previous_question_id = this.active_question_id - 1;
      } else {
          this.previous_question_id = -1;
      }

      this.question = this.questions[this.active_question_id];
      this.setQuestionTemplate();
      this.answered = false;
    },
    nextQuestion() {
      this.last_question_id = this.count - 1;
      if (this.active_question_id < this.last_question_id) {
          this.active_question_id = this.active_question_id + 1;
          this.previous_question_id = this.active_question_id - 1;
      }

      if (this.active_question_id < this.last_question_id) {
          this.next_question_id = this.active_question_id + 1;
      } else {
          this.next_question_id = -1;
      }

      this.question = this.questions[this.active_question_id];
      this.setQuestionTemplate();
      this.answered = false;
    },
    isQuestionAnswer (question, choice) {
      this.answer = _.find(this.answers, {
          question: question
      });

      return _.isObject(this.answer) ? (this.answer.answer === choice) : false;
    },
    setQuestionAnswer (question, choice) {
      this.answer = _.find(this.answers, {
          question: question
      });

      if (_.isObject(this.answer)) {
          this.answer.answer = choice;
      } else {
          this.answer = {
              question: question,
              answer: choice
          };
      }

      this.answers = _.reject(this.answers, {
          question: question
      });

      this.answers.push(this.answer);
      this.saveQuestionAnswer();
      this.answered = true;
    },
    
    saveQuestionAnswer() {
      this.answer.created_by = this.user_id;
      this.answer.project = this.project_id;

      if (this.answer && this.answer.id) {
          return auditServices.updateAuditAnswer(this.audit.id, this.answer.id, this.answer)
              .then(function (answer) {
                  this.answer = answer.data;
              }, function (error) {
                  console.log(error);
              });
      } else {
          return auditServices.saveAuditAnswer(this.audit.id, this.answer)
              .then(function (answer) {
                  this.answer = answer.data;
              }, function (error) {
                  console.log(error);
              });
      }
    },

    submitAudit (params) {
      this.$router.push('/')
      audit_id: this.audit_id
        // $state.go("mammothAudits.Detail.ThankYou", {
        //     audit_id: this.audit.id
        // });
    },

    setRate (rate) {
        this.rate = rate;
    },
  },
 }
</script>

<style scoped>
</style>
