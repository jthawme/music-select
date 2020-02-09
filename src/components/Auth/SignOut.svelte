<script>
  import { navigate } from "svelte-routing";
  import firebase from "../../utils/firebase";

  firebase
    .auth()
    .signOut()
    .then(() => {
      navigate("/");
    })
    .catch(error => {
      console.error(error);
      navigate("/");
    });
</script>
