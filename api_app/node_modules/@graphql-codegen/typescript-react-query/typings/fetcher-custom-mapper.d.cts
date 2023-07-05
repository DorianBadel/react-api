import { CustomFetch } from './config.cjs';
import { FetcherRenderer } from './fetcher.cjs';
import { OperationDefinitionNode } from 'graphql';
import { ReactQueryVisitor } from './visitor.cjs';
export declare class CustomMapperFetcher implements FetcherRenderer {
    private visitor;
    private _mapper;
    private _isReactHook;
    constructor(visitor: ReactQueryVisitor, customFetcher: CustomFetch);
    private getFetcherFnName;
    generateFetcherImplementaion(): string;
    generateInfiniteQueryHook(node: OperationDefinitionNode, documentVariableName: string, operationName: string, operationResultType: string, operationVariablesTypes: string, hasRequiredVariables: boolean): string;
    generateQueryHook(node: OperationDefinitionNode, documentVariableName: string, operationName: string, operationResultType: string, operationVariablesTypes: string, hasRequiredVariables: boolean): string;
    generateMutationHook(node: OperationDefinitionNode, documentVariableName: string, operationName: string, operationResultType: string, operationVariablesTypes: string, hasRequiredVariables: boolean): string;
    generateFetcherFetch(node: OperationDefinitionNode, documentVariableName: string, operationName: string, operationResultType: string, operationVariablesTypes: string, hasRequiredVariables: boolean): string;
}
