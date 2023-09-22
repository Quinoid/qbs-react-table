import { act, render as testRender } from '@testing-library/react';
import getStyle from 'dom-lib/getStyle';
/* eslint-disable react/no-find-dom-node */

import React from 'react';
import * as ReactDOM from 'react-dom';
import { findDOMNode, unmountComponentAtNode } from 'react-dom';
import * as ReactTestUtils from 'react-dom/test-utils';

export { getStyle };

globalThis.IS_REACT_ACT_ENVIRONMENT = true;

const majorVersion = parseInt(React.version);

/**
 * Check whether it is a DOM object?
 * @param node
 * @return {boolean}
 */
function isDOMElement(node) {
  return (
    node && typeof node === 'object' && node.nodeType === 1 && typeof node.nodeName === 'string'
  );
}

function guid() {
  return '_' + Math.random().toString(36).substr(2, 12);
}

// Record every container created for rendering
// Useful for doing a cleanup after each test case
// Ref: https://github.com/testing-library/react-testing-library/blob/main/src/pure.js
const mountedContainers = new Set();
const mountedRoots = new Set();

export function render(children) {
  const container = createTestContainer();

  if (majorVersion >= 18) {
    /**
     * Fix react 18 warnings
     * Error: Warning: You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".
     */
    ReactDOM['__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED'].usingClientEntryPoint = true;

    const { createRoot } = ReactDOM;

    const root = createRoot(container);
    root.render(children);

    mountedRoots.add(root);

    return container;
  }

  ReactDOM.render(children, container);

  return container;
}

export function cleanup() {
  mountedContainers.forEach(cleanupAtContainer);
  mountedRoots.forEach(root => {
    act(() => {
      root.unmount();
    });
  });
}

afterEach(() => {
  cleanup();
});

// maybe one day we'll expose this (perhaps even as a utility returned by render).
// but let's wait until someone asks for it.
function cleanupAtContainer(container) {
  act(() => {
    if (majorVersion < 18) {
      unmountComponentAtNode(container);
    }
  });
  if (container.parentNode === document.body) {
    document.body.removeChild(container);
  }
  mountedContainers.delete(container);
}

export function getInstance(children, waitForDidMount = true) {
  const instanceRef = React.createRef();

  if (waitForDidMount) {
    // Use act() to make sure componentDidMount/useEffect is done
    act(() => {
      render(React.cloneElement(children, { ref: instanceRef }));
    });
  } else {
    render(React.cloneElement(children, { ref: instanceRef }));
  }

  return instanceRef.current;
}

/**
 * @return {HTMLElement}
 */
export function getDOMNode(children) {
  if (isDOMElement(children)) {
    return children;
  }

  if (isDOMElement(children.child)) {
    return children.child;
  }

  if (ReactTestUtils.isCompositeComponent(children)) {
    return findDOMNode(children);
  }

  return getTestDOMNode(children);
}

export function getTestDOMNode(children) {
  const testId = guid();
  const childTestId = guid();
  const { getByTestId } = testRender(
    <div data-testid={testId}>{React.cloneElement(children, { 'data-testid': childTestId })}</div>
  );

  try {
    return getByTestId(testId).firstChild || getByTestId(childTestId);
  } catch (e) {
    return null;
  }
}

/**
 * @param {HTMLElement} node
 * @return {String}
 */
export function innerText(node) {
  if (window.navigator.userAgent.toLowerCase().indexOf('firefox') !== -1) {
    return node.textContent;
  }
  return node.innerText;
}

/**
 * @return {HTMLDivElement}
 */
export function createTestContainer() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  // we'll add it to the mounted containers regardless of whether it's actually
  // added to document.body so the cleanup method works regardless of whether
  // they're passing us a custom container or not.
  mountedContainers.add(container);

  return container;
}

export const inChrome = window.navigator.userAgent.includes('Chrome');

export const itChrome = (...args) => {
  if (inChrome) {
    it(...args);
  }
};
