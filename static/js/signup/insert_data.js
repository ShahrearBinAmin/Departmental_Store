var name,email,password,phone,dept;

function input_data() {

    name = document.getElementById("name");
    email= document.getElementById("email");
    password= document.getElementById("password");
    phone= document.getElementById("phone");
    dept= document.getElementById("dept");
    alert(name);

}

/*<body>


<div id="window">
  <h1  style="font-size: 30px ; color: #F4D03F">SIGN UP</h1>
  <div id="modal">
    <form>
      <div class="group">
        <input type="text" placeholder="Name" required="required" id="name"/><span class="bar"> </span>
      </div>
      <div class="group">
        <input type="email" placeholder="Email" required="required" id="email"/><span class="bar"> </span>
      </div>
      <div class="group">
        <input type="password" placeholder="Password" required="required" id="password"/><span class="bar"> </span>
      </div>
      <div class="group">
        <input type="password" placeholder="Confirm Password" required="required" id="confirm_password"/><span class="bar"></span>
      </div>
        <div class="group">
        <input type="tel" placeholder="Phonr Number" required="required" id="phone" pattern="^(?:\+?88)?01[15-9]\d{8}"/><span class="bar"></span>
      </div>
        <div class="group">
        <input type="text" placeholder="Dept_name"  id="dept" /><span class="bar"></span>
      </div>

      <button type="submit" href="{{ url_for('insert') }}">Submit</button>
    </form>
  </div>
</div>
</body>*/
