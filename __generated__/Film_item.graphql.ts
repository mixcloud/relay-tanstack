/**
 * @generated SignedSource<<0f02391707dd65b17eef6e73c561879c>>
 * @lightSyntaxTransform
 * @nogrep
 */

/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from 'relay-runtime';
import { FragmentRefs } from "relay-runtime";
export type Film_item$data = {
  readonly director: string | null | undefined;
  readonly title: string | null | undefined;
  readonly " $fragmentType": "Film_item";
};
export type Film_item$key = {
  readonly " $data"?: Film_item$data;
  readonly " $fragmentSpreads": FragmentRefs<"Film_item">;
};

const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "Film_item",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "title",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "director",
      "storageKey": null
    }
  ],
  "type": "Film",
  "abstractKey": null
};

(node as any).hash = "c9f51e2684bc3729688bf3147d59c8cf";

export default node;
