<template>
  <div class="min-h-[80vh] flex items-center justify-center relative px-4">
    <!-- Hero Section -->
    <section class="relative py-20 overflow-hidden w-full max-w-5xl mx-auto">
    <!-- Glow Background -->
    <div class="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
      <!-- Purple Blob -->
      <div class="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-600/20 rounded-full blur-[120px] animate-blob"></div>
      <!-- Pink Blob -->
      <div class="absolute bottom-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-pink-600/20 rounded-full blur-[120px] animate-blob animation-delay-2000"></div>
      <!-- Secondary Purple -->
      <div class="absolute top-[20%] right-[10%] w-[30vw] h-[30vw] bg-indigo-600/10 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
    </div>

      <div class="container-snug text-center">
        <div class="space-y-8 max-w-4xl mx-auto">
          <transition name="fade-up" mode="out-in">
            <div v-if="!isSubscribed" key="form-header">
              <span class="badge-gradient text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/20">
                Hệ thống đang phát triển
              </span>
              <div class="mt-8 space-y-2">
                <h2 class="text-2xl md:text-4xl font-black tracking-[0.2em] uppercase">
                  <span class="text-gradient">DASHBOARD</span>
                </h2>
                <h1 class="text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-none uppercase whitespace-nowrap">
                  OSCAR MUSIC GROUP
                </h1>
              </div>
              <p class="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mt-4">
                Hệ thống quản lý nghệ sĩ và doanh thu thế hệ mới đang được đội ngũ Oscar Music Group hoàn thiện những bước cuối cùng. hãy đăng ký ngay để không bỏ lỡ thời gian ra mắt của Oscar Music Group
              </p>
              
              <div class="pt-10">
                <transition name="slide-fade" mode="out-in">
                  <div v-if="!showForm" key="buttons" class="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="https://oscarlabel.com" class="btn-primary min-w-[220px]"> 
                       Quay lại trang chủ 
                    </a>
                    <button @click="showForm = true" class="btn-secondary min-w-[220px]"> 
                      Nhận quyền truy cập sớm 
                    </button>
                  </div>
                  
                  <div v-else key="form" class="max-w-md mx-auto">
                    <form @submit.prevent="subscribe" class="flex flex-col gap-4">
                      <div class="relative group">
                        <input 
                          v-model="email" 
                          type="email" 
                          name="email"
                          required 
                          placeholder="Nhập email cá nhân/nghệ sĩ..." 
                          class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500/50 transition-all backdrop-blur-md text-center"
                        />
                      </div>
                      <button type="submit" class="btn-primary w-full py-5 text-lg group overflow-hidden" :disabled="loading">
                        <span v-if="!loading" class="flex items-center justify-center gap-3">
                          Đăng ký 
                          <i class="fa-solid fa-arrow-right-long group-hover:translate-x-1 transition-transform"></i>
                        </span>
                        <span v-else class="flex items-center justify-center gap-3">
                          <i class="fa-solid fa-circle-notch animate-spin"></i> Đang xử lý
                        </span>
                      </button>
                      <button type="button" @click="showForm = false" class="text-xs text-gray-500 hover:text-gray-300 transition-colors uppercase tracking-widest font-bold">
                        Quay lại
                      </button>
                    </form>
                  </div>
                </transition>
              </div>
            </div>

            <div v-else key="success" class="space-y-6 py-10 scale-in">
              <div class="w-24 h-24 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg shadow-green-500/20 animate-pulse">
                <i class="fa-solid fa-check text-4xl text-green-400"></i>
              </div>
              <h2 class="text-3xl md:text-5xl font-black text-white tracking-tight">Xác nhận thành công!</h2>
              <p class="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
                Cảm ơn bạn đã đăng ký trải nghiệm Dashboard, chúng tôi sẽ thông báo đến bạn sớm nhất sau khi Dashboard ra mắt.
              </p>
              <div class="pt-10">
                <a href="https://oscarlabel.com" class="btn-primary inline-flex px-10"> Quay lại trang chủ </a>
              </div>
            </div>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default'
})

useHead({
  title: 'Dashboard | Oscar Music Group',
  link: [
    { rel: 'stylesheet', href: 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css' }
  ],
  meta: [
    { name: 'description', content: 'Hệ thống Dashboard đang trong quá trình xây dựng.' }
  ]
})

const showForm = ref(false)
const isSubscribed = ref(false)
const email = ref('')
const loading = ref(false)

const subscribe = async () => {
  if (!email.value) return
  
  loading.value = true
  
  try {
    const response = await fetch('https://formspree.io/f/meevngvz', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.value
      })
    })

    if (response.ok) {
      isSubscribed.value = true
    } else {
      alert('Có lỗi xảy ra, vui lòng thử lại sau.')
    }
  } catch (error) {
    alert('Không thể kết nối máy chủ. Vui lòng kiểm tra mạng.')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.text-gradient {
  background: linear-gradient(to right, #818cf8, #c084fc, #818cf8);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-size: 200% auto;
  animation: shine 4s linear infinite;
}

@keyframes shine {
  to { background-position: 200% center; }
}

/* Transitions */
.fade-up-enter-active, .fade-up-leave-active {
  transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.fade-up-enter-from {
  opacity: 0;
  transform: translateY(20px);
}
.fade-up-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-fade-enter-active, .slide-fade-leave-active {
  transition: all 0.4s ease;
}
.slide-fade-enter-from {
  opacity: 0;
  transform: scale(0.95);
}
.slide-fade-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

.scale-in {
  animation: scale-in 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}
</style>
