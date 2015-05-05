# Showgroup

This is a simple jQuery plugin to show and hide groups of elements - eg on a form.

[![Build Status](https://travis-ci.org/ingenerator/showgroup.png?branch=master)](https://travis-ci.org/ingenerator/showgroup)

## Dependencies

* jQuery > 1.*

## Installation

Vendor the package into your project however you prefer. Include src/showgroup.js in your project's javascript - usually
by compiling it in with any other scripts you're using.

## Usage

You can call use showgroup manually:

```html
<div id="container" data-showgroup-container data-showgroup-default="car">
  <div>
    <label>Vehicle Type</label>
    <select id="vehicle">
      <option value="car" selected>Car</option>
      <option value="bike">Bike</option>
      <option value="van">Van</option>
    </select>
  <div data-showgroups="car,van">
    <label>Engine Size</label>
    <input type="text">
  </p>
  <div data-showgroups="car,van,bike">
    <label>Tyre Pressure</label>
    <input type="text">
  </div>
</div>
<script type="text/javascript">
  $('#container').showgroup()>;
  $('#vehicle').on('change', function() {
    $('#container').showgroup($(this).val());
  });
</script>
```

You could also implement this with the lazy data-api. Note though that you are then responsible for initialising the
visibility of the elements, either in javascript or your server-side code:

```html
<div id="container" data-showgroup-container>
  <div>
    <label>Vehicle Type</label>
    <select id="vehicle" data-showgroup-toggle>
      <option value="car">Car</option>
      <option value="bike" selected>Bike</option>
      <option value="van">Van</option>
    </select>
  <div data-showgroups="car,van" style="display: none;">
    <label>Engine Size</label>
    <input type="text">
  </p>
  <div data-showgroups="car,van,bike">
    <label>Tyre Pressure</label>
    <input type="text">
  </div>
</div>
```


## Contributions

Contributions and bugfixes are welcome - just submit a pull request. Please ensure you add new qunit tests to cover
your changes.
