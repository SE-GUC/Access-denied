import React from 'react'

function PartnerInfo() {
  return (
    <div>
      <form action="/action_page.php">
        <input
          type="text"
          name="name"
          id="input1"
          value="moaz ashraf"
          readOnly
        />
        <button>edit</button>

        <br />

        <input
          type="text"
          name="email"
          id="input2"
          value="moaazashraf98@yahoo.com"
          readOnly
        />
        <button>edit</button>
        <br />

        <input
          type="text"
          name="email"
          id="input2"
          value="moaazashraf98@yahoo.com"
          readOnly
        />
        <button>edit</button>
        <br />

        <input
          type="text"
          name="Telephone_number"
          id="input3"
          value="0106561155"
          readOnly
        />
        <button>edit</button>
        <br />

        <input type="text" name="address" id="input3" value="cairo" readOnly />
        <button>edit</button>
        <br />

        <input
          type="text"
          name="field of work"
          id="input4"
          value="software engineering"
          readOnly
        />
        <button>edit</button>
        <br />

        <button>save</button>
      </form>
    </div>
  )
}

export default PartnerInfo
