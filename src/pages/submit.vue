<template>  
    <div class="content">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" class="demo-ruleForm" size="medium">
            <el-form-item prop="region">
                <el-select class="select" v-model="ruleForm.name" placeholder="请选择产品名称">
                    <el-option label="dms" value="dms"></el-option>
                    <el-option label="dts" value="dts"></el-option>
                    <el-option label="大象图谱" value="dxtp"></el-option>
                    <el-option label="万象智联" value="wxzl"></el-option>
                </el-select>
            </el-form-item>
                <el-form-item>
            <el-upload
            :data="ruleForm"
            ref="files"
            class="upload-demo"
            drag
            action="/apis/user"
            :auto-upload="false"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            :on-change="uploadChange"
            :on-exceed="uploadExceed"
            :limit="1"
            multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传zip文件，且不超过1000M</div>
            </el-upload>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">上传文档</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

    
  <!-- </el-main>
</el-container> -->
  
</template>

<script>
export default {
    name: 'HelloWorld',
    components: {

    },
    data() {
        return {
            ruleForm: {
                name: '',
            },
            rules: {
                name: [
                    { required: true, message: '请选择产品名称', trigger: 'change' }
                ]
            },
            loading: null,
            fileLists: []
        }
    },
    created() {
    },
    mounted() { },
    methods: {
        submitForm(formName) {
            if (this.ruleForm.name.length <= 0) {
                this.$message({ message: '请选择系统名称', type: 'error' });
                return
            }
            if (this.fileLists.length <= 0) {
                this.$message({ message: '请选择文件', type: 'error' });
                return
            }
            let nameArray = this.fileLists[0].name.split('.')

            if (nameArray[nameArray.length - 1] !== 'zip') {
                this.$message({ message: '请选择.zip压缩文件', type: 'error' });
                return
            }
            this.loading = this.$loading({ lock: true, text: '正在上传请稍后', spinner: 'el-icon-loading', background: 'rgba(0, 0, 0, 0.7)' });
            this.$refs.files.submit();
        },
        uploadChange(file, flieList) {
            this.fileLists = flieList
        },
        uploadExceed() {
            this.$message({ message: '只能选择一个文件', type: 'error' });
        },
        uploadSuccess(response, file, fileList) {
            this.loading.close()
            if (response.code == 1) {
                this.$message({ message: '文件上传成功', type: 'success' });
                this.resetForm('ruleForm')
            }
        },
        uploadError(err, file, fileList) {
            this.resetForm('ruleForm')
            this.loading.close()
            this.$message({
                message: err,
                type: 'error'
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
            this.$refs.files.clearFiles()
        }
    }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-main {
  background-color: #fff;
  color: #333;
  text-align: center;
  line-height: 160px;
}
.content {
  width: 360px;
  height: 500px;
  margin: 0 auto;
}
.select {
  width: 100%;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
