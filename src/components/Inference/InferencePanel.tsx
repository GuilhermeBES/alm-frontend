import { useState, useEffect } from 'react';
import { Alert, Button, Card, Form, ProgressBar, Table } from 'react-bootstrap';
import { apiService } from '../../services/ApiService';
import {
  ModelInfo,
  InferenceUploadResponse,
  InferenceResultResponse,
  JobStatus
} from '../../services/interfaces';
import styles from './InferencePanel.module.css';

const InferencePanel = () => {
  const [models, setModels] = useState<ModelInfo[]>([]);
  const [selectedModel, setSelectedModel] = useState<string>('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<InferenceUploadResponse | null>(null);
  const [inferenceResult, setInferenceResult] = useState<InferenceResultResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPolling, setIsPolling] = useState(false);

  useEffect(() => {
    loadModels();
  }, []);

  const loadModels = async () => {
    try {
      const response = await apiService.listModels();
      setModels(response.models);
      if (response.models.length > 0) {
        setSelectedModel(response.models[0].name);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar modelos';
      setError(errorMessage);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.csv')) {
        setError('Por favor, selecione um arquivo CSV');
        setSelectedFile(null);
        return;
      }
      setSelectedFile(file);
      setError(null);
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!selectedFile || !selectedModel) {
      setError('Selecione um modelo e um arquivo CSV');
      return;
    }

    setIsLoading(true);
    setError(null);
    setUploadResponse(null);
    setInferenceResult(null);

    try {
      // Upload CSV and submit inference job
      const response = await apiService.submitInference(selectedModel, selectedFile);
      setUploadResponse(response);

      // Start polling for results
      setIsPolling(true);
      const result = await apiService.pollInferenceResult(response.job_id);
      setInferenceResult(result);
      setIsPolling(false);

      if (result.status === JobStatus.FAILED) {
        setError(result.error || 'Inferência falhou');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao processar inferência';
      setError(errorMessage);
      setIsPolling(false);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = (status: JobStatus) => {
    const statusMap = {
      [JobStatus.PENDING]: { variant: 'secondary', text: 'Pendente' },
      [JobStatus.PROCESSING]: { variant: 'info', text: 'Processando' },
      [JobStatus.COMPLETED]: { variant: 'success', text: 'Concluído' },
      [JobStatus.FAILED]: { variant: 'danger', text: 'Falhou' }
    };

    const { variant, text } = statusMap[status] || { variant: 'secondary', text: status };

    return <span className={`badge bg-${variant}`}>{text}</span>;
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  };

  return (
    <div className={styles.inferencePanel}>
      <Card className={styles.card}>
        <Card.Header>
          <h3 className={styles.cardTitle}>Inferência xLSTM</h3>
          <p className={styles.cardSubtitle}>
            Upload de arquivo CSV para previsão de preços usando modelos xLSTM
          </p>
        </Card.Header>
        <Card.Body>
          {error && (
            <Alert variant="danger" dismissible onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Selecione o Modelo</Form.Label>
              <Form.Select
                value={selectedModel}
                onChange={(e) => setSelectedModel(e.target.value)}
                disabled={isLoading || models.length === 0}
              >
                {models.length === 0 && (
                  <option>Nenhum modelo disponível</option>
                )}
                {models.map((model) => (
                  <option key={model.name} value={model.name}>
                    {model.name} {model.loaded ? '(carregado)' : ''}
                  </option>
                ))}
              </Form.Select>
              {models.length === 0 && (
                <Form.Text className="text-warning">
                  ⚠️ Nenhum modelo PyTorch encontrado na pasta models/
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Arquivo CSV</Form.Label>
              <Form.Control
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                disabled={isLoading || models.length === 0}
              />
              <Form.Text className="text-muted">
                O arquivo deve conter colunas de embeddings (emb_0 a emb_127) e last_price
              </Form.Text>
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              disabled={isLoading || !selectedFile || !selectedModel || models.length === 0}
              className={styles.submitButton}
            >
              {isLoading ? 'Processando...' : 'Executar Inferência'}
            </Button>
          </Form>

          {uploadResponse && (
            <div className={styles.uploadResponse}>
              <Alert variant="info">
                <strong>Job ID:</strong> {uploadResponse.job_id}
                <br />
                <strong>Status:</strong> {getStatusBadge(uploadResponse.status)}
                <br />
                <strong>Modelo:</strong> {uploadResponse.model}
                <br />
                <em>{uploadResponse.message}</em>
              </Alert>
            </div>
          )}

          {isPolling && (
            <div className={styles.pollingIndicator}>
              <ProgressBar animated now={100} label="Aguardando resultado..." />
            </div>
          )}

          {inferenceResult && inferenceResult.status === JobStatus.COMPLETED && inferenceResult.result && (
            <div className={styles.results}>
              <h4>Resultados da Previsão</h4>
              <Table striped bordered hover className={styles.resultsTable}>
                <thead>
                  <tr>
                    <th>Métrica</th>
                    <th>Valor</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Preço Atual</td>
                    <td>{formatPrice(inferenceResult.result.current_price)}</td>
                  </tr>
                  <tr>
                    <td>Horizonte de Previsão</td>
                    <td>{inferenceResult.result.prediction_horizon} dias</td>
                  </tr>
                  <tr>
                    <td>Número de Previsões</td>
                    <td>{inferenceResult.result.predicted_prices.length}</td>
                  </tr>
                </tbody>
              </Table>

              <h5>Preços Previstos</h5>
              <Table striped bordered hover size="sm" className={styles.pricesTable}>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Dia</th>
                    <th>Preço Previsto</th>
                    <th>Variação</th>
                  </tr>
                </thead>
                <tbody>
                  {inferenceResult.result.predicted_prices.map((price, index) => {
                    const variation = ((price - inferenceResult.result!.current_price) /
                      inferenceResult.result!.current_price) * 100;
                    return (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>D+{index + 1}</td>
                        <td>{formatPrice(price)}</td>
                        <td className={variation >= 0 ? 'text-success' : 'text-danger'}>
                          {variation >= 0 ? '+' : ''}{variation.toFixed(2)}%
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <div className={styles.metadata}>
                <small className="text-muted">
                  Submetido em: {new Date(inferenceResult.submitted_at).toLocaleString('pt-BR')}
                  <br />
                  Concluído em: {inferenceResult.completed_at ?
                    new Date(inferenceResult.completed_at).toLocaleString('pt-BR') : 'N/A'}
                </small>
              </div>
            </div>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default InferencePanel;
