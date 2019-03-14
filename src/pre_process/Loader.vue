<template src="./Loader.html">
  
</template>

<script>
// import {upload} from './file-upload.service';
const STATUS_INITIAL = 0, STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;
export default {
  data (){
    return{
      uploadedFiles: [],
      uploadError: null,
      currentStatus: null,
      uploadFieldName: 'data'
    }
  },
  computed: {
    isInitial() {
      return this.currentStatus === STATUS_INITIAL;
    },
    isSaving() {
      return this.currentStatus === STATUS_SAVING;
    },
    isSuccess() {
      return this.currentStatus === STATUS_SUCCESS;
    },
    isFailed() {
      return this.currentStatus === STATUS_FAILED;
    }
  },
  methods: {
    reset() {
      // reset form to initial state
      this.currentStatus = STATUS_INITIAL;
      this.uploadedFiles = [];
      this.uploadError = null;
    },
    save(formData) {
      // upload data to the server
      this.currentStatus = STATUS_SAVING;

      this.$http.post( 'http://localhost:8000/loader/upload/',
        formData,
        {
          withCredentials: true,
          headers: {
              Authorization: `JWT ${this.$store.state.jwt}`,
              'Content-Type': 'multipart/form-data'
          }
        }
      ).then(function(){
        console.log('SUCCESS!!');
        this.currentStatus = STATUS_SUCCESS;
        this.$router.push('/custom_fields');
      })
      .catch(function(err){
        console.log('FAILURE!!');
        this.uploadError = err.response;
        this.currentStatus = STATUS_FAILED;
      });

      this.$http({
        method: 'get',
        url : 'http://localhost:8000/loader/missing_observations/',
        withCredentials: true,
        headers: {
          Authorization: `JWT ${this.$store.state.jwt}`,
          'Content-Type': 'application/json'
        }
      })
      .then (data =>{
        console.log(data)
      })
      .catch(error => {
        console.log(error)
      })
    },
    filesChange(fieldName, fileList) {
      // handle file changes
      const formData = new FormData();

      if (!fileList.length) return;

      // append the files to FormData
      Array
        .from(Array(fileList.length).keys())
        .map(x => {
          formData.append(fieldName, fileList[x], fileList[x].name);
        });

      // save it
      this.save(formData);
    }
  },
  mounted() {
    this.reset();
  },
}
</script>



<style scoped>
  .dropbox {
    outline: 2px dashed grey; 
    outline-offset: -10px;
    background: lightcyan;
    color: dimgray;
    padding: 10px 10px;
    min-height: 200px; 
    position: relative;
    cursor: pointer;
  }

  .input-file {
    opacity: 0; 
    width: 100%;
    height: 200px;
    position: absolute;
    cursor: pointer;
  }

  .dropbox:hover {
    background: lightblue; /* when mouse over to the drop zone, change color */
  }

  .dropbox p {
    font-size: 1.2em;
    text-align: center;
    padding: 50px 0;
  }
</style>
