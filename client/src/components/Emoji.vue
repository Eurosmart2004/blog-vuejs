<template>
  <div class="w-100 h-100 d-flex flex-column py-2 position-relative">
    <p class="m-0 mb-2 ps-2 d-inline-flex align-items-center">
      <div style="height: 30px;">
        <img v-if="mostCommonReacts.Like" class="" :src="Like" style="width: 30px" />
        <img v-if="mostCommonReacts.Love" class="" :src="Love" style="width: 30px" />
        <img v-if="mostCommonReacts.Haha" class="" :src="Haha" style="width: 30px" />
        <img v-if="mostCommonReacts.Wow" class="" :src="Wow" style="width: 30px" />
        <img v-if="mostCommonReacts.Sad" class="" :src="Sad" style="width: 30px" />
        <img v-if="mostCommonReacts.Angry" class="" :src="Angry" style="width: 30px" />
      </div>
      <b v-if="numberReact > 0" class="ps-2">{{ numberReact }}</b>
    </p>
    <div
      v-if="hovered && userData"
      v-motion
      :initial="{ opacity: 0, y: 50 }"
      :visible="{ opacity: 1, y: 0, scale: 1 }"
      :duration="500"
      v-on:mouseover="handleMouseOver"
      v-on:mouseleave="handleHover"
      :style="{ visibility: hovered ? 'visible' : 'hidden' }"
      class="reactHolders bg-white d-inline-flex justify-content-around position-absolute"
    >
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Like"
        style="width: 50px"
        @click="handleEmojiClick('Like')"
      />
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Love"
        style="width: 50px"
        @click="handleEmojiClick('Love')"
      />
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Haha"
        style="width: 50px"
        @click="handleEmojiClick('Haha')"
      />
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Wow"
        style="width: 50px"
        @click="handleEmojiClick('Wow')"
      />
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Sad"
        style="width: 50px"
        @click="handleEmojiClick('Sad')"
      />
      <img
        class=""
        v-motion
        :initial="{ scale: 1 }"
        :hovered="{ scale: 1.3 }"
        :src="Angry"
        style="width: 50px"
        @click="handleEmojiClick('Angry')"
      />
    </div>
    <button
      class="likeButton d-flex justify-content-center align-items-center"
      v-on:mouseover="handleMouseOver"
      v-on:mouseleave="handleHover"
      v-motion
      :initial="{ scale: 1 }"
      :hovered="{ scale: 1.1 }"
      @click="handleEmojiClick(this.iconChoose || 'Like')"
    >
      <div class="w-50">
        <img :src="iconImg" style="width: 40px" />
      </div>
      <p class="m-0 w-50 d-inline-flex align-items-center">
        {{ iconChoose || "Like" }}
      </p>
    </button>
  </div>
</template>
<script>
import LikeIcon from "../assets/Emoji/likeicon.png";
import Angry from "../assets/Emoji/angry.gif";
import Haha from "../assets/Emoji/laughing.gif";
import Like from "../assets/Emoji/like.gif";
import Love from "../assets/Emoji/love.gif";
import Sad from "../assets/Emoji/sad.gif";
import Wow from "../assets/Emoji/wow.gif";

export default {
  name: "Emoji",
  props: {
    numberReact: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: "",
    },
    userData: {
      type: Object,
      default: null,
    },
    mostCommonReacts: {
      type: Object,
      default: {},
    }
  },
  data() {
    return {
      LikeIcon,
      Like,
      Angry,
      Haha,
      Love,
      Sad,
      Wow,
      hovered: false,
      hoverTimeout: null,
      emitTimeout: null,
      iconChoose: "",
    };
  },
  watch: {
    icon() {
      this.iconChoose = this.icon;
    }, 
  },
  computed: {
    iconImg: function () {
      if (this.iconChoose === "Like") {
        return Like;
      } else if (this.iconChoose === "Angry") {
        return Angry;
      } else if (this.iconChoose === "Haha") {
        return Haha;
      } else if (this.iconChoose === "Love") {
        return Love;
      } else if (this.iconChoose === "Sad") {
        return Sad;
      } else if (this.iconChoose === "Wow") {
        return Wow;
      } else {
        return LikeIcon;
      }
    },
  },
  methods: {
    handleHover() {
      this.hoverTimeout = setTimeout(() => {
        this.hovered = false;
      }, 300);
    },
    handleMouseOver() {
      clearTimeout(this.hoverTimeout);
      this.hovered = true;
    },
    handleEmojiClick(emoji) {
      if (this.userData === null) {
        return;
      }
      if (this.iconChoose === emoji) {
        this.iconChoose = "";
      } else {
        this.iconChoose = emoji;
      }
      clearTimeout(this.hoverTimeout);
      this.hovered = false;
      if (this.emitTimeout) clearTimeout(this.emitTimeout);
      this.emitTimeout = setTimeout(() => {
        this.$emit("emoji-click", emoji);
      }, 0);
    },
  },
};
</script>
<style scoped>
.likeButton {
  width: 120px;
  height: 50px;
  background: white;
  box-shadow: 3px 3px 30px rgba(0, 10, 10, 0.2);
  border: none;
  border-radius: 20px;
}
.reactHolders {
  width: 320px;
  box-shadow: 3px 3px 30px rgba(0, 10, 10, 0.2);
  border-radius: 20px;
  padding: 10px;
  top: -30px;
  left: -10px;
}
</style>
