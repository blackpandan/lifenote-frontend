import 'material-design-icons-iconfont'
import Vue from 'vue';
import Vuetify from 'vuetify/lib';

Vue.use(Vuetify);

export default new Vuetify({
    icons:{
        iconfont: 'md'
    },
    theme: {
        themes: {
            dark: {
                primary: "#00BCD4"
            }
        }
    }
});
