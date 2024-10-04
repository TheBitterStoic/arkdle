export default (await import('vue')).defineComponent({
    name: 'ArkLogo',
    props: {
        logoSrc: {
            type: String,
            default: '../public/ArkLogo.png' // Add your default logo path here
        },
        altText: {
            type: String,
            default: 'Ark Logo' // Default alt text
        }
    }
});
function __VLS_template() {
    const __VLS_ctx = {};
    const __VLS_localComponents = {
        ...{},
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_components;
    const __VLS_localDirectives = {
        ...{},
        ...__VLS_ctx,
    };
    let __VLS_directives;
    let __VLS_styleScopedClasses;
    let __VLS_resolvedLocalAndGlobalComponents;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({ ...{ class: ("logo") }, });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({ src: ((__VLS_ctx.logoSrc)), alt: ((__VLS_ctx.altText)), ...{ class: ("logo-image") }, });
    __VLS_styleScopedClasses['logo'];
    __VLS_styleScopedClasses['logo-image'];
    var __VLS_slots;
    var __VLS_inheritedAttrs;
    const __VLS_refs = {};
    var $refs;
    return {
        slots: __VLS_slots,
        refs: $refs,
        attrs: {},
    };
}
;
let __VLS_self;
