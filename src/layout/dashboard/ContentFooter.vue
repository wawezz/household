<template>
  <footer class="footer">
    <br />
    <div class="kt-footer kt-footer--extended kt-grid__item" id="kt_footer">
      <div class="kt-footer__top">
        <div class="kt-container kt-container--fluid">
          <div class="row">
            <div class="col-lg-4">
              <div class="kt-footer__section">
                <h3 class="kt-footer__title">About</h3>
                <div class="kt-footer__content">Some text we need</div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="kt-footer__section">
                <h3 class="kt-footer__title">Quick Links</h3>
                <div class="kt-footer__content">
                  <div class="kt-footer__nav">
                    <div class="kt-footer__nav-section">
                      <router-link to="/houses/1">Houses</router-link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-lg-4">
              <div class="kt-footer__section">
                <h3 class="kt-footer__title">Get In Touch</h3>
                <div class="kt-footer__content">
                  <form action class="kt-footer__subscribe">
                    <div class="input-group">
                      <input type="text" class="form-control" placeholder="Enter Your Email" />
                      <div class="input-group-append">
                        <button class="btn btn-brand" type="button">Join</button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="kt-footer__bottom">
        <div class="kt-container kt-container--fluid">
          <div class="kt-footer__wrapper">
            <div class="kt-footer__logo">
              <a href="demo2/index.html">
                <img alt="Logo" src="../../assets/media/logos/logo-2-sm.png" />
              </a>
              <div class="kt-footer__copyright">
                © {{year}}
                <router-link to="/dashboard">Household</router-link>
              </div>
            </div>
            <div class="kt-footer__menu">
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear()
      };
    }
  };
</script>


<style>
</style>
