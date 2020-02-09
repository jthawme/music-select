<script>
  import { onMount } from "svelte";
  import * as firebaseui from "../../utils/firebaseui/esm";
  import "../../utils/firebaseui/firebaseui.css";
  import firebase from "../../utils/firebase";

  const authUiConfig = {
    signInSuccessUrl: "/",
    signInOptions: [
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
      firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
    signInFlow: "popup"
    // tosUrl: '<your-tos-url>',
    // privacyPolicyUrl: function() {
    //   window.location.assign('<your-privacy-policy-url>');
    // }
  };

  const ui = new firebaseui.auth.AuthUI(firebase.auth());

  onMount(() => {
    ui.start("#firebaseui-auth-container", authUiConfig);
    ui.disableAutoSignIn();
  });
</script>

<style lang="scss">

</style>

<div id="firebaseui-auth-container" />
