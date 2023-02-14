import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, a as space, q as text, M as head_selector, l as claim_element, h as detach, c as claim_space, m as children, r as claim_text, n as attr, D as append_hydration, b as insert_hydration, C as noop, o as onMount } from "../../../chunks/index-d4ff72c6.js";
function create_fragment(ctx) {
  let meta;
  let t0;
  let section;
  let span;
  let t1;
  return {
    c() {
      meta = element("meta");
      t0 = space();
      section = element("section");
      span = element("span");
      t1 = text("About Fun Photos");
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-n8yjdh", document.head);
      meta = claim_element(head_nodes, "META", { name: true, content: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", {});
      var section_nodes = children(section);
      span = claim_element(section_nodes, "SPAN", {});
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, "About Fun Photos");
      span_nodes.forEach(detach);
      section_nodes.forEach(detach);
      this.h();
    },
    h() {
      document.title = "About";
      attr(meta, "name", "description");
      attr(meta, "content", "About Fun Photos");
    },
    m(target, anchor) {
      append_hydration(document.head, meta);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, section, anchor);
      append_hydration(section, span);
      append_hydration(span, t1);
    },
    p: noop,
    i: noop,
    o: noop,
    d(detaching) {
      detach(meta);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(section);
    }
  };
}
function instance($$self, $$props, $$invalidate) {
  const prerender = true;
  onMount(() => {
  });
  return [prerender];
}
class Page extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance, create_fragment, safe_not_equal, { prerender: 0 });
  }
  get prerender() {
    return this.$$.ctx[0];
  }
}
export {
  Page as default
};
