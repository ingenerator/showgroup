/**
 * QUnit tests for the showgroup jquery plugin
 *
 * @author    Andrew Coulton <andrew@ingenerator.com>
 * @copyright 2015 inGenerator Ltd
 * @licence   BSD
 */
$(function () {

  QUnit.module("showgroup");

  QUnit.test("should be defined on jquery object", function (assert) {
    assert.ok($(document.body).showgroup, "showgroup method is defined");
  });

  QUnit.test("should return element", function (assert) {
    assert.ok($(document.body).showgroup()[0] == document.body, "document.body returned");
  });

  QUnit.test("should set the active group of elements visible and hide others", function (assert) {
    var $fixture      = $("#qunit-fixture"),
        $solo_child   = $('<div data-showgroups="one"></div>'),
        $joint_child  = $('<div data-showgroups="one,two"></div>'),
        $hidden_child = $('<div data-showgroups="three"></div>');
    $fixture.append($solo_child).append($joint_child).append($hidden_child);

    $fixture.showgroup("one");

    assert.ok($solo_child.is(":visible"), "child only in the active group should be visible");
    assert.ok($joint_child.is(":visible"), "child with multiple groups including active should be visible");
    assert.ok($hidden_child.is(":hidden"), "child not in the active group should be hidden");

    $fixture.showgroup("two");
    assert.ok($solo_child.is(":hidden"), "child in group 1 should be hidden when group 2 is triggered");
    assert.ok($joint_child.is(":visible"), "child in group 1 and 2 should be visible when group 2 triggered");
  });

  QUnit.test("should ignore elements with no tags", function (assert) {
    var $fixture       = $("#qunit-fixture"),
        $child         = $('<div data-showgroups="one"></div>'),
        $other_element = $("<div></div>");
    $fixture.append($child).append($other_element);

    $fixture.showgroup("one");

    assert.ok($child.is(":visible"), "child in the active group should be visible");
    assert.ok($other_element.is(":visible"), "elements without data-showgroups tags should not be affected");
  });

  QUnit.test("should hide elements even if there is nothing to show in active group", function (assert) {
    var $fixture   = $("#qunit-fixture"),
        $child_one = $('<div data-showgroups="one"></div>'),
        $child_two = $('<div data-showgroups="two"></div>');
    $fixture.append($child_one).append($child_two);

    $fixture.showgroup("three");
    assert.ok($child_one.is(":hidden"), 'group "one" should hide when group "three" is active');
    assert.ok($child_two.is(":hidden"), 'group "two" should hide when group "three" is active');

  });

  QUnit.test("should match the whole group name", function (assert) {
    var $fixture    = $("#qunit-fixture"),
        $child_one  = $('<div data-showgroups="one"></div>'),
        $child_bone = $('<div data-showgroups="bone"></div>'),
        $child_oney = $('<div data-showgroups="oney"></div>'),
        $child_two  = $('<div data-showgroups="two"></div>');
    $fixture.append($child_one).append($child_two).append($child_bone).append($child_oney);

    $fixture.showgroup("one");
    assert.ok($child_bone.is(":hidden"), 'group "bone" should hide when group "one" is active');
    assert.ok($child_oney.is(":hidden"), 'group "oney" should hide when group "one" is active');
  });

  QUnit.test("should be initialisable with a default group using a data API", function (assert) {
    var $fixture   = $("#qunit-fixture"),
        $container = $('<div data-showgroup-container data-showgroup-default="one"></div>'),
        $child_one = $('<div data-showgroups="one"></div>'),
        $child_two = $('<div data-showgroups="two"></div>');
    $container.append($child_one).append($child_two);
    $fixture.append($container);

    $container.showgroup();
    assert.ok($child_one.is(":visible"), "default group 'one' should be visible");
    assert.ok($child_two.is(":hidden"), "default group 'two' should be visible");
  });

  QUnit.test("should be lazy-initialisable on change of a field with data-showgroup-toggle", function (assert) {
    var $fixture   = $("#qunit-fixture"),
        $container = $("<div data-showgroup-container></div>").appendTo($fixture),
        $select    = $('<select data-showgroup-toggle><option value="one" selected>One</option><option value="two"></option></select>').appendTo($container),
        $child_one = $('<div data-showgroups="one"></div>').appendTo($container),
        $child_two = $('<div data-showgroups="two" style="display: none;"></div>').appendTo($container);

    $select.val("two").trigger("change");

    assert.ok($child_one.is(":hidden"), "Group one should hide when two is selected");
    assert.ok($child_two.is(":visible"), "Group two should be visible when two is selected");
  });
});
