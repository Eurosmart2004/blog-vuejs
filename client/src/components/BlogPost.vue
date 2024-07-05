<template>
  <div class="my-2 row">
    <div class="col-lg-12">
      <div class="row">
        <div v-motion 
          :initial="{ opacity: 0, y: 0, x: index % 2 === 0 ? -50 : 50 }" 
          :visible-once="{ opacity: 1, y: 0, x: 0 }" 
          :delay="200"
          :duration="1000" 
          class="col-lg-6 justify-content-center d-flex flex-column"
          :class="[index % 2 === 0 ? 'order-lg-1' : 'order-lg-2']">
          <div class="card rounded-3">
            <div class="d-block blur-shadow-image">
              <img :src="blog.blogImage" alt="img-blur-shadow-blog-2" class="img-fluid shadow rounded-3"
                style="width: 100%; height: 450px;" />
            </div>
          </div>
        </div>
        <div 
        v-motion 
          :initial="{ opacity: 0, y: 0, x: index % 2 === 0 ? 50 : -50 }" 
          :visible-once="{ opacity: 1, y: 0, x: 0 }" 
          :delay="200"
          :duration="1000" 
        class="col-lg-6 justify-content-center d-flex flex-column ps-lg-5 pt-lg-0 pt-3"
          :class="[index % 2 === 0 ? 'order-lg-2' : 'order-lg-1']">
          <h3 class="text-darker">
            <p>{{ blog.blogTitle }}</p>
          </h3>
          <p>
          <p v-html="shortBlogHTML"></p>
          <div class="mt-5">
            <router-link :to="{ name: 'BlogShow', params: { id: blog._id } }"
              class="text-black text-uppercase my-sm-2 text-decoration-none animated-link">
              <span style="display: inline-flex; align-items: center">
                Read more
                <i class="bi bi-arrow-right" style="font-size: 1em; margin-left: 0.5em"></i>
              </span>
            </router-link>
          </div>
          </p>
          <p class="author">
            By
            <span class="font-weight-bold">{{ userName }}</span>, {{ date }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import instance from '@/axios/instance';
  export default {
    name: "BlogPost",
    props: ["blog", "index"],
    computed: {
      date() {
        let blogDate = new Date(
          this.blog.datePost || this.comment.createdAt
        );
        let now = new Date();
        let diffInSeconds = Math.abs((now - blogDate) / 1000).toFixed(0);
        let diffInMinutes = Math.floor(diffInSeconds / 60).toFixed(0);
        let diffInHours = Math.floor(diffInSeconds / 3600).toFixed(0);
        let diffInDays = Math.floor(diffInSeconds / 86400).toFixed(0);
        let diffInYears = Math.floor(diffInSeconds / (86400 * 365)).toFixed(0);
        if (diffInYears > 0) {
          return `${diffInYears} year${diffInYears > 1 ? "s" : ""} ago`;
        } else if (diffInDays > 0) {
          return `${diffInDays} day${diffInDays > 1 ? "s" : ""} ago`;
        } else if (diffInHours > 0) {
          return `${diffInHours} hour${diffInHours > 1 ? "s" : ""} ago`;
        } else if (diffInMinutes > 0) {
          return `${diffInMinutes} minute${diffInMinutes > 1 ? "s" : ""} ago`;
        } else {
          return `${diffInSeconds} second${diffInSeconds > 1 ? "s" : ""} ago`;
        }

        return "";
      },
      shortBlogHTML() {
        // Create a temporary div element
        const div = document.createElement('div');

        // Set the innerHTML to the blog HTML
        div.innerHTML = this.blog.blogHTML;

        // Initialize an empty string to hold the short HTML
        let shortHTML = '';

        // Initialize a counter for the number of characters
        let count = 0;

        // Iterate over each child node of the div
        for (const node of div.childNodes) {
          // If the node is a text node, add its whole text content to shortHTML
          // and increase the count by the length of the text content
          if (node.nodeType === Node.TEXT_NODE) {
            shortHTML += node.textContent;
            count += node.textContent.length;
          }
          // If the node is an element node, add its outerHTML to shortHTML
          // and increase the count by the length of its text content
          else if (node.nodeType === Node.ELEMENT_NODE) {
            shortHTML += node.outerHTML;
            count += node.textContent.length;
          }

          // If the count is greater than or equal to 100, break the loop
          if (count >= 150) {
            break;
          }
        }

        // Return the short HTML
        return shortHTML;
      }
    },
    data() {
      return {
        userName: '',
      };
    },
    async mounted() {
      try {
        const response = await instance.get(`/user/basicInfo/${this.blog.author_id}`);
        this.userName = response.data.user.firstName + ' ' + response.data.user.lastName;
      } catch (error) {

      }
    },
  };
</script>
<style lang="scss" scoped>
  .blog-post {
    height: 450px;

    @media screen and (max-width: 792px) {
      height: fit-content;
    }
  }
</style>
