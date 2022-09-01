<template>
  <div class="password">
    <div class="CCIT-common-title mb-20">
      <h2 class="bold">人脸识别</h2>
    </div>
    <el-row>
      <el-col :span="16">
        <div align="center">
          <el-form>
            <el-form-item>
              <div v-show="showVideo">
                <video id='video' width='400px' height='400px' autoplay='autoplay' style='margin-top: 20px'></video>
                <canvas id='canvas' width='400px' height='400px' style='display: none'></canvas>
                <!--<div class="face-outline" ></div>-->
              </div>
              <div v-show="!showVideo">
                <img src="@/assets/images/blank_bg.jpg" alt="" style="width: 400px; height: 400px;margin-top: 20px">
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="getMedia()" v-show="openVideo">开启摄像头</el-button>
              <el-button type="primary" @click="dataFormSubmit()" v-show="showSubmit">拍    照</el-button>
              <el-button type="primary" @click="closeVideo()" v-show="showSubmit">取    消</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :span="8">
        <img  v-show="imgData!=''" :src="imgData" alt="" style="width: 300px; height: 300px;margin-top: 70px">
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { faceAdd , listFaces } from '@/api/system/face'
export default {
  data() {
    return {
      imgData:'',
      showVideo: false,
      openVideo: true,
      showSubmit: false,
    }
  },
  created() {
    this.listFaces();
  },
  methods: {
    closeVideo(){
      this.showVideo = false;
      this.showSubmit = false;
      this.openVideo = true;
      let video = document.getElementById("video");
      if (video && video.srcObject) { //关闭摄像头
        for (let item of video.srcObject.getTracks()) {
          item.stop();
        }
      }
    },
    listFaces(){
      listFaces(this.$store.getters.userInfo.userId).then(res => {
        if (res.data.length > 0) {
          this.imgData = res.data[0].faceImg;
        }
      })
    },
    dataFormSubmit() {
      //获得Canvas对象
      let video = document.getElementById("video");
      let canvas = document.getElementById("canvas");
      let ctx = canvas.getContext('2d');
      ctx.drawImage(video, 0, 0, 400, 400);
      var formData = new FormData();
      var base64File = canvas.toDataURL();
      formData.append("file", base64File);
      faceAdd(formData, this.$store.getters.userInfo.userId).then(res => {
        if(res.code == 200){
          this.imgData = base64File;
          this.showVideo = false;
          this.showSubmit = false;
          this.closeVideo();
        }else{
          this.showVideo = true;
          this.showSubmit = true;
        }

        this.openVideo = true;

        this.$message({
          message: res.msg,
          type: 'success',
          duration: 1500
        })

      })
    },
    getMedia() {
      let constraints = {
        video: {width: 400, height: 400},
        audio: false
      };
      //获得video摄像头区域
      let video = document.getElementById("video");
      let promise = navigator.mediaDevices.getUserMedia(constraints);
      promise.then(function (MediaStream) {
        video.srcObject = MediaStream;
        video.play();
      });
      this.showVideo = true;
      this.showSubmit = true;
      this.openVideo = false;
    },
  }

}
</script>
<style>
.face-outline{
  width: 400px;
  height: 400px;
  margin-top: 20px;
  background-image: url("../../../../assets/images/face_scan_success.gif");
  background-repeat: no-repeat;
  background-position: center;
  z-index:1;
}
</style>
