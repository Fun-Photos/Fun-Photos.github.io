import { S as SvelteComponent, i as init, s as safe_not_equal, k as element, q as text, a as space, l as claim_element, m as children, r as claim_text, h as detach, c as claim_space, n as attr, b as insert_hydration, D as append_hydration, K as listen, C as noop, v as binding_callbacks, L as src_url_equal, x as create_component, M as head_selector, y as claim_component, z as mount_component, f as transition_in, t as transition_out, A as destroy_component, o as onMount } from "../../chunks/index-d4ff72c6.js";
const SourceImage_svelte_svelte_type_style_lang = "";
function create_else_block(ctx) {
  let span;
  let t;
  return {
    c() {
      span = element("span");
      t = text("Image Preview");
    },
    l(nodes) {
      span = claim_element(nodes, "SPAN", {});
      var span_nodes = children(span);
      t = claim_text(span_nodes, "Image Preview");
      span_nodes.forEach(detach);
    },
    m(target, anchor) {
      insert_hydration(target, span, anchor);
      append_hydration(span, t);
      ctx[8](span);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(span);
      ctx[8](null);
    }
  };
}
function create_if_block(ctx) {
  let img;
  let img_src_value;
  return {
    c() {
      img = element("img");
      this.h();
    },
    l(nodes) {
      img = claim_element(nodes, "IMG", { src: true, alt: true, class: true });
      this.h();
    },
    h() {
      if (!src_url_equal(img.src, img_src_value = ""))
        attr(img, "src", img_src_value);
      attr(img, "alt", "Preview");
      attr(img, "class", "svelte-1mbi6b8");
    },
    m(target, anchor) {
      insert_hydration(target, img, anchor);
      ctx[7](img);
    },
    p: noop,
    d(detaching) {
      if (detaching)
        detach(img);
      ctx[7](null);
    }
  };
}
function create_fragment$1(ctx) {
  let h1;
  let t0;
  let t1;
  let input_1;
  let t2;
  let div;
  let mounted;
  let dispose;
  function select_block_type(ctx2, dirty) {
    if (
      /*showImage*/
      ctx2[4]
    )
      return create_if_block;
    return create_else_block;
  }
  let current_block_type = select_block_type(ctx);
  let if_block = current_block_type(ctx);
  return {
    c() {
      h1 = element("h1");
      t0 = text("Image Preview on File Upload");
      t1 = space();
      input_1 = element("input");
      t2 = space();
      div = element("div");
      if_block.c();
      this.h();
    },
    l(nodes) {
      h1 = claim_element(nodes, "H1", {});
      var h1_nodes = children(h1);
      t0 = claim_text(h1_nodes, "Image Preview on File Upload");
      h1_nodes.forEach(detach);
      t1 = claim_space(nodes);
      input_1 = claim_element(nodes, "INPUT", { type: true });
      t2 = claim_space(nodes);
      div = claim_element(nodes, "DIV", { class: true });
      var div_nodes = children(div);
      if_block.l(div_nodes);
      div_nodes.forEach(detach);
      this.h();
    },
    h() {
      attr(input_1, "type", "file");
      attr(div, "class", "svelte-1mbi6b8");
    },
    m(target, anchor) {
      insert_hydration(target, h1, anchor);
      append_hydration(h1, t0);
      insert_hydration(target, t1, anchor);
      insert_hydration(target, input_1, anchor);
      ctx[6](input_1);
      insert_hydration(target, t2, anchor);
      insert_hydration(target, div, anchor);
      if_block.m(div, null);
      ctx[9](div);
      if (!mounted) {
        dispose = listen(
          input_1,
          "change",
          /*onChange*/
          ctx[5]
        );
        mounted = true;
      }
    },
    p(ctx2, [dirty]) {
      if (current_block_type === (current_block_type = select_block_type(ctx2)) && if_block) {
        if_block.p(ctx2, dirty);
      } else {
        if_block.d(1);
        if_block = current_block_type(ctx2);
        if (if_block) {
          if_block.c();
          if_block.m(div, null);
        }
      }
    },
    i: noop,
    o: noop,
    d(detaching) {
      if (detaching)
        detach(h1);
      if (detaching)
        detach(t1);
      if (detaching)
        detach(input_1);
      ctx[6](null);
      if (detaching)
        detach(t2);
      if (detaching)
        detach(div);
      if_block.d();
      ctx[9](null);
      mounted = false;
      dispose();
    }
  };
}
function instance$1($$self, $$props, $$invalidate) {
  let input;
  let container;
  let image;
  let placeholder;
  let showImage = false;
  function onChange() {
    const file = input.files[0];
    if (file) {
      $$invalidate(4, showImage = true);
      const reader = new FileReader();
      reader.addEventListener("load", function() {
        image.setAttribute("src", reader.result);
      });
      reader.readAsDataURL(file);
      return;
    }
    $$invalidate(4, showImage = false);
  }
  function input_1_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      input = $$value;
      $$invalidate(0, input);
    });
  }
  function img_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      image = $$value;
      $$invalidate(2, image);
    });
  }
  function span_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      placeholder = $$value;
      $$invalidate(3, placeholder);
    });
  }
  function div_binding($$value) {
    binding_callbacks[$$value ? "unshift" : "push"](() => {
      container = $$value;
      $$invalidate(1, container);
    });
  }
  return [
    input,
    container,
    image,
    placeholder,
    showImage,
    onChange,
    input_1_binding,
    img_binding,
    span_binding,
    div_binding
  ];
}
class SourceImage extends SvelteComponent {
  constructor(options) {
    super();
    init(this, options, instance$1, create_fragment$1, safe_not_equal, {});
  }
}
function create_fragment(ctx) {
  let meta;
  let t0;
  let section;
  let span;
  let t1;
  let t2;
  let sourceimage;
  let current;
  sourceimage = new SourceImage({});
  return {
    c() {
      meta = element("meta");
      t0 = space();
      section = element("section");
      span = element("span");
      t1 = text("Fun Photos");
      t2 = space();
      create_component(sourceimage.$$.fragment);
      this.h();
    },
    l(nodes) {
      const head_nodes = head_selector("svelte-df48wv", document.head);
      meta = claim_element(head_nodes, "META", { name: true, content: true });
      head_nodes.forEach(detach);
      t0 = claim_space(nodes);
      section = claim_element(nodes, "SECTION", {});
      var section_nodes = children(section);
      span = claim_element(section_nodes, "SPAN", {});
      var span_nodes = children(span);
      t1 = claim_text(span_nodes, "Fun Photos");
      span_nodes.forEach(detach);
      section_nodes.forEach(detach);
      t2 = claim_space(nodes);
      claim_component(sourceimage.$$.fragment, nodes);
      this.h();
    },
    h() {
      document.title = "Fun Photos";
      attr(meta, "name", "description");
      attr(meta, "content", "Fun Photos");
    },
    m(target, anchor) {
      append_hydration(document.head, meta);
      insert_hydration(target, t0, anchor);
      insert_hydration(target, section, anchor);
      append_hydration(section, span);
      append_hydration(span, t1);
      insert_hydration(target, t2, anchor);
      mount_component(sourceimage, target, anchor);
      current = true;
    },
    p: noop,
    i(local) {
      if (current)
        return;
      transition_in(sourceimage.$$.fragment, local);
      current = true;
    },
    o(local) {
      transition_out(sourceimage.$$.fragment, local);
      current = false;
    },
    d(detaching) {
      detach(meta);
      if (detaching)
        detach(t0);
      if (detaching)
        detach(section);
      if (detaching)
        detach(t2);
      destroy_component(sourceimage, detaching);
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
