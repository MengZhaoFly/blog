registerLayout('block-like', class {
  async intrinsicSizes(children, edges, styleMap) {
    const childrenSizes = await Promise.all(children.map((child) => {
      return child.intrinsicSizes();
    }));

    const maxContentSize = childrenSizes.reduce((max, childSizes) => {
      return Math.max(max, childSizes.maxContentSize);
    }, 0) + edges.inline;

    const minContentSize = childrenSizes.reduce((max, childSizes) => {
      return Math.max(max, childSizes.minContentSize);
    }, 0) + edges.inline;

    return { maxContentSize, minContentSize };
  }

  async layout(children, edges, constraints, styleMap) {
    // Determine our (inner) available size.
    const availableInlineSize = constraints.fixedInlineSize - edges.inline;
    const availableBlockSize = constraints.fixedBlockSize ?
      constraints.fixedBlockSize - edges.block : null;

    const childFragments = [];
    const childConstraints = { availableInlineSize, availableBlockSize };

    const childFragments = await Promise.all(children.map((child) => {
      return child.layoutNextFragment(childConstraints);
    }));

    let blockOffset = edges.blockStart;
    for (let fragment of childFragments) {
      // Position the fragment in a block like manner, centering it in the
      // inline direction.
      fragment.blockOffset = blockOffset;
      fragment.inlineOffset = Math.max(
        edges.inlineStart,
        (availableInlineSize - fragment.inlineSize) / 2);

      blockOffset += fragment.blockSize;
    }

    const autoBlockSize = blockOffset + edges.blockEnd;

    return {
      autoBlockSize,
      childFragments,
    };
  }
});