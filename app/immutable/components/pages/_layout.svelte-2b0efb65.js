import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, l as claim_element, m as children, h as detach, n as attr, b as insert_hydration, D as append_hydration, C as noop, E as destroy_each, q as text, r as claim_text, F as create_slot, x as create_component, a as space, y as claim_component, c as claim_space, z as mount_component, G as update_slot_base, H as get_all_dirty_from_scope, I as get_slot_changes, f as transition_in, t as transition_out, A as destroy_component } from "../../chunks/index-d4ff72c6.js";
const Nav_svelte_svelte_type_style_lang = "";
function get_each_context(ctx, list, i) {
  const child_ctx = ctx.slice();
  child_ctx[1] = list[i];
  return child_ctx;
}
function create_each_block(ctx) {
  let li;
  let a;
  let t_value = (
    /*link*/
    ctx[1].name + ""
  );
  let t;
  return {
    c() {
      li = element("li");
      a = element("a");
      t = text(t_value);
      this.h();
    },
    l(nodes) {
      li = claim_element(nodes, "LI", { class: true });
      var li_nodes = children(li);
      a = claim_element(li_nodes, "A", { href: true, class: true });
      var a_nodes = children(a);
      t = claim_text(a_nodes, t_value);
      a_nodes.forEach(detach);
      li_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(
        a,
        "href",
        /*link*/
        ctx[1].route
      );
      attr(a, "class", "svelte-1soweoa");
      attr(li, "class", "svelte-1soweoa");
    },
    m(target, anchor) {
      insert_hydration(target, li, anchor);
      append_hydration(li, a);
      append_hydration(a, t);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(li);
    }
  };
}
function create_fragment$2(ctx) {
  let nav;
  let ul;
  let each_value = (
    /*links*/
    ctx[0]
  );
  let each_blocks = [];
  for (let i = 0; i < each_value.length; i += 1) {
    each_blocks[i] = create_each_block(get_each_context(ctx, each_value, i));
  }
  return {
    c() {
      nav = element("nav");
      ul = element("ul");
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].c();
      }
      this.h();
    },
    l(nodes) {
      nav = claim_element(nodes, "NAV", { class: true });
      var nav_nodes = children(nav);
      ul = claim_element(nav_nodes, "UL", { class: true });
      var ul_nodes = children(ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].l(ul_nodes);
      }
      ul_nodes.forEach(detach);
      nav_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(ul, "class", "links svelte-1soweoa");
      attr(nav, "class", "svelte-1soweoa");
    },
    m(target, anchor) {
      insert_hydration(target, nav, anchor);
      append_hydration(nav, ul);
      for (let i = 0; i < each_blocks.length; i += 1) {
        each_blocks[i].m(ul, null);
      }
    },
    p(ctx2, [dirty]) {
      if (dirty & /*links*/
      1) {
        each_value = /*links*/
        ctx2[0];
        let i;
        for (i = 0; i < each_value.length; i += 1) {
          const child_ctx = get_each_context(ctx2, each_value, i);
          if (each_blocks[i]) {
            each_blocks[i].p(child_ctx, dirty);
          } else {
            each_blocks[i] = create_each_block(child_ctx);
            each_blocks[i].c();
            each_blocks[i].m(ul, null);
          }
        }
        for (; i < each_blocks.length; i += 1) {
          each_blocks[i].d(1);
        }
        each_blocks.length = each_value.length;
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(nav);
      destroy_each(each_blocks, detaching);
    }
  };
}
function instance$1($$self) {
  const links = [{ route: "/", name: "Home" }, { route: "/about", name: "About" }];
  return [links];
}
class Nav extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$2, safe_not_equal, {});
  }
}
const Footer_svelte_svelte_type_style_lang = "";
function create_fragment$1(ctx) {
  let footer;
  let span;
  let t;
  return {
    c() {
      footer = element("footer");
      span = element("span");
      t = text("Footer content goes here.");
      this.h();
    },
    l(nodes) {
      footer = claim_element(nodes, "FOOTER", { class: true });
      var footer_nodes = children(footer);
      span = claim_element(footer_nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, "Footer content goes here.");
      span_nodes.forEach(detach);
      footer_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(footer, "class", "svelte-wpcgor");
    },
    m(target, anchor) {
      insert_hydration(target, footer, anchor);
      append_hydration(footer, span);
      append_hydration(span, t);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(footer);
    }
  };
}
class Footer extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, null, create_fragment$1, safe_not_equal, {});
  }
}
const app = "";
const _layout_svelte_svelte_type_style_lang = "";
function create_fragment(ctx) {
  let nav;
  let t0;
  let main;
  let t1;
  let footer;
  let current;
  nav = new Nav({});
  const default_slot_template = (
    /*#slots*/
    ctx[2].default
  );
  const default_slot = create_slot(
    default_slot_template,
    ctx,
    /*$$scope*/
    ctx[1],
    null
  );
  footer = new Footer({});
  return {
    c() {
      create_component(nav.$$.fragment);
      t0 = space();
      main = element("main");
      if (default_slot)
        default_slot.c();
      t1 = space();
      create_component(footer.$$.fragment);
      this.h();
    },
    l(nodes) {
      claim_component(nav.$$.fragment, nodes);
      t0 = claim_space(nodes);
      main = claim_element(nodes, "MAIN", { class: true });
      var main_nodes = children(main);
      if (default_slot)
        default_slot.l(main_nodes);
      main_nodes.forEach(detach);
      t1 = claim_space(nodes);
      claim_component(footer.$$.fragment, nodes);
      this.h();
    },
    h() {
      attr(main, "class", "svelte-rj2wa3");
    },
    m(target, anchor) {
      mount_component(nav, target, anchor);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, main, anchor);
      if (default_slot) {
        default_slot.m(main, null);
      }
      insert_hydration(target, t1, anchor);
      mount_component(footer, target, anchor);
      current = true;
    },
    p(ctx2, [dirty]) {
      if (default_slot) {
        if (default_slot.p && (!current || dirty & /*$$scope*/
        2)) {
          update_slot_base(
            default_slot,
            default_slot_template,
            ctx2,
            /*$$scope*/
            ctx2[1],
            !current ? get_all_dirty_from_scope(
              /*$$scope*/
              ctx2[1]
            ) : get_slot_changes(
              default_slot_template,
              /*$$scope*/
              ctx2[1],
              dirty,
              null
            ),
            null
          );
        }
      }
    },
    i(local) {
      if (current)
        return;
      transition_in(nav.$$.fragment, local);
      transition_in(default_slot, local);
      transition_in(footer.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(nav.$$.fragment, local);
      transition_out(default_slot, local);
      transition_out(footer.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      destroy_component(nav, detaching);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(main);
      if (default_slot)
        default_slot.d(detaching);
      if (detaching)
        detach(t1);
      destroy_component(footer, detaching);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  let { $$slots: slots = {}, $$scope } = $$props;
  const prerender = true;
  $$self.$$set = ($$props2) => {
    if ("$$scope" in $$props2)
      $$invalidate(1, $$scope = $$props2.$$scope);
  };
  return [prerender, $$scope, slots];
}
class Layout extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { prerender: 0 });
  }
  get prerender() {
    return this.$$.ctx[0];
  }
}
export {
  Layout as default
};
