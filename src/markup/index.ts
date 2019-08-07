import abbreviation, { Abbreviation, AbbreviationNode } from '@emmetio/abbreviation';
import attributes from './attributes';
import snippets from './snippets';
import implicitTag from './implicit-tag';
import jsx from './addon/jsx';
import xsl from './addon/xsl';
import bem from './addon/bem';
import { Config } from '../config';
import { walk, Container } from './utils';

/**
 * Parses given Emmet abbreviation into a final abbreviation tree with all
 * required transformations applied
 */
export default function parse(abbr: string | Abbreviation, config: Config): Abbreviation {
    if (typeof abbr === 'string') {
        abbr = abbreviation(abbr, config);
    }

    walk(abbr, transform, config);
    return abbr;
}

/**
 * Modifies given node and prepares it for output
 */
function transform(node: AbbreviationNode, ancestors: Container[], config: Config) {
    snippets(node, ancestors, config);
    implicitTag(node, ancestors, config);
    attributes(node);

    if (config.syntax === 'xsl') {
        xsl(node);
    }

    if (config.syntax === 'jsx' || config.options['jsx.enabled']) {
        jsx(node);
    }

    if (config.options['bem.enabled']) {
        bem(node, ancestors, config);
    }
}
